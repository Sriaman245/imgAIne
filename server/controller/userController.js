import userModel from "../models/userModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay' 
import transactionModel from "../models/transactionModels.js";

const registerUser=async (req,res)=>{
    try{

        // getting data from registration form
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }
        
        // encrypting passowrd
        // A salt is a random, unique string of characters added to a password before it is hashed.
        const salt=await bcrypt.genSalt(10) //genSalt() is function for creating the salt0
        const hashPass=await bcrypt.hash(password,salt) //Ye line password ko hash (encrypt) kar deti hai.


        const userData={
            name,email,password:hashPass
        }
        
        // passing data to Schema
        const newUser=new userModel(userData)
        // saving data into the database
        const user=await newUser.save()
        
        // for authentication to generate token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token,user:{name:user.name}})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const loginUser=async (req,res)=>{
    try{
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return res.json({success:false,message:"User does not exist"})
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(isMatch){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        return res.json({success:true,token,user:{name:user.name}})
    }
    else{
        return res.json({success:false,message:"Invalid Credentials"})
    }
    }
    catch(error){
        cosnole.log(error)
        res.json({success:false,message:error.message})
    }
}

// backend pe ek API chahiye hogi jo current credit balance bataye.Ye userCredits function wahi API hai.
const userCredits=async (req,res)=>{
    try{
        const {userId}=req.body//we get id by using middlewares i.e from auth.js
        const user=await userModel.findById(userId)
        console.log("Fetched user:", user); 
        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})

    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay=async (req,res)=>{
    try{
        const {userId,planId}=req.body
       
        if(!userId || !planId){
            res.json({success:false,message:'Missing Details'})
        }
        const userData=await userModel.findById(userId)
        if(!userData){
            return res.json({success:false,message:'User not found'});
        }
        let credits,plan,amount,date

        switch(planId){
            case 'Basic':
                plan='Basic'
                credits=100
                amount=10
                break;
            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=50
                break;
            case 'Business':
                plan='Business'
                credits=5000
                amount=250
                break;
            default:
                return res.json({success:false, message:'plan not found'});
        }
        date=Date.now();
        const transactionData={
            userId,plan,amount,credits,date
        }   
        
        // sending data to transactionModel
        const newTransaction=await transactionModel.create(transactionData)

        const options={
            amount:amount*100,//when we chose plan of 500 then razor consider it as 5.00 so to make it 500 we have to multiply it with 100
            currency:process.env.CURRENCY,
            receipt:newTransaction._id
        }

        // await razorpayInstance.orders.create(options,(error,order)=>{
        //     if(error){
        //         return res.json({success:false,message:error})
        //     }
        //     res.json({success:true,order})
        // })
        const order=await razorpayInstance.orders.create(options);
        res.json({success:true,order});
    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

const verifyPayment=async (req,res)=>{
    try{
        const {razorpay_order_id}=req.body;
        // we will fetch the order info from the above id
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status==='paid'){
            // if paid then we fetch the info from the database so that we can update payment to true
            const transactionData=await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){//if payemnt in transaction database already true then we send below res
                return res.json({success:false,message:'Payment already done'})
            }
            //if payment in transaction database is not true then we need to update credit balance and also to make payment true
                const userData=await userModel.findById(transactionData.userId)//finding userId 
                const creditBalance=userData.creditBalance+transactionData.credits//adding credits to user for ex- user has 6 credit and user choose plan for 500 credit then through this line - total credit is 506
                await userModel.findByIdAndUpdate(userData._id,{creditBalance})
                
                await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})//updating payment to true

                res.json({success:true, message:"Credits Added"})
        }
        else{
            res,json({success:false,message:"Payment Failed"})
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {registerUser,loginUser,userCredits,paymentRazorpay,verifyPayment};

