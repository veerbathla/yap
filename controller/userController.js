import User from "../Models/userModels.js";
import bcryptjs from "bcryptjs";
import jwToken from "../utils/jsonWebToken.js";

export const userRegister=async(req,res)=>{
try{
   const {fullname,username,email,password,gender,profilepic}=req.body;
   const user=await User.findOne({username,email});
   if(user)
    return res.status(500).send({success:false,message:"Username or email already exists"});
   
   const hashPassword =bcryptjs.hashSync(password,10);
   const profileBoy=profilepic ||`https://avatar.iran.liara.run/public/boy?username=${username}`;
   const profileGirl=profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;
   
   const newUser=new User({
    fullname,
    username,
    email,
    password:hashPassword,
    gender,
    profilepic:gender==="male"?profileBoy:profileGirl
   })
   if(newUser){
    await newUser.save();
jwToken(newUser._id,res);
   }
   else
   {
    return res.status(500).send({success:false,message:"User registration failed"});
   }
   res.status(201).send({
    _id:newUser._id,
    fullname:newUser.fullname,
    username:newUser.username,
    email:newUser.email,
    gender:newUser.gender,
    profilepic:newUser.profilepic,

    
})
}

catch(err)
{
    res.status(500).send({success:false,
        message:"An error occurred during registration"
    })
    console.log(err);
}
}


export const userLogin=async(req,res)=>{
    try{
         //console.log("BODY:", req.body);
       const{email,password}=req.body;
       const user=await User.findOne({email})
       if(!user)
        return res.status(500).send({success:false,message:"User doesn't exist"});
    const comparePassword=bcryptjs.compareSync(password,user.password ||"");
    if(!comparePassword)
        return res.status(500).send({success:false,message:"Invalid email or password"});
    jwToken(user._id,res)
    res.status(200).send({
         _id:user._id,
    fullname:user.fullname,
    username:user.username,
    email:user.email,
    gender:user.gender,
    profilepic:user.profilepic,
    message:"Successfully logged in"
    })

    }
    catch(err)
    {        res.status(500).send({success:false,
            message:"An error occurred during login"
        })
        console.log(err);
    }
}


export const userLogout=async(req,res)=>{
    try{
     res.cookie("jwt",'',{
        maxAge:0,
     })
     res.status(200).send({success:true,message:"Successfully logged out"})
    }
    catch(err)
    {
        res.status(500).send({success:false,
            message:"An error occurred during logout"
        })
        console.log(err);
    }
}