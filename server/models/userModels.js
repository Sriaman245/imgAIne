import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    creditBalance:{type:Number,default:5}
})

// if user model exist then we directly use it if not then it create new model named as user
const userModel=mongoose.models.user || mongoose.model("user",userSchema)

export default userModel