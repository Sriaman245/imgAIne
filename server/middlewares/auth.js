import jwt from "jsonwebtoken"

const userAuth=async(req,res,next)=>{
    const {token}=req.headers;//we get token from headers
    if(!token){
        return res.json({success:false,message:'Not Authorized. Login Again'});
    }
    try{
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);//we verfiy the token we get from the header
        if(tokenDecode && tokenDecode.id){
            const userId=tokenDecode.id;
            req.userId=userId;
            if(!req.body) req.body={};
            if(!req.body.userId) req.body.userId=userId;
            req.body.userId=tokenDecode.id;//storing id to userId
        }
        else{
            res.json({success:false,message:"Not Authorized. Login Again"});
        }
        next();
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

export default userAuth;