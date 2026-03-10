import jwt from "jsonwebtoken";
import User from "../Models/userModels.js";

const isLoggedIn=async(req,res,next)=>{
try{
 const token=req.cookies.jwt;
 console.log(token);
 if(!token)
    return res.status(401).send({success:false,message:"Unauthorized"});
const decoded=jwt.verify(token,process.env.JWT_SECRET);
if(!decoded)
    return res.status(401).send({success:false,message:"invald token"});
const user=await User.findById(decoded.userId).select("-password");
if(!user)
    return res.status(401).send({success:false,message:"User not found"})
req.user=user,
next();
}
catch(err)
{
    return res.status(500).send({
        success:false,
        message:err
    });
}
}

export default isLoggedIn;