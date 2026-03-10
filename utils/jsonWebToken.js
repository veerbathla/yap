import jwt from 'jsonwebtoken';

const jwToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
    res.cookie('jwt',token,{
        max:30*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.Secure!=="development"
    })
}

export default jwToken;