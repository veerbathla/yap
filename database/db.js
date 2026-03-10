import mongoose from 'mongoose';
import dotenv from 'dotenv';

const db=async()=>{
    try{
       await mongoose.connect(process.env.MONGODB_URL),
       console.log("DataBase connected Successfulyy")
    }
    catch(err)
    {
       console.log(err); 
    }
}

export default db;