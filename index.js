
import dotenv from "dotenv"
import express from "express"
import db from "./database/db.js";
import authRouter from "./routes/authUser.js";
import messageRouter from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
const app=express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter);
app.use('/api/user',userRouter);

app.get('/',(req,res)=>{
    res.send("Server is working")
})
const PORT=process.env.PORT ||3000;
app.listen(PORT,()=>{
    db();
    console.log(`Running on ${PORT}`)
})