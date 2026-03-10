import Conversation from "../Models/conversationModels.js";

export const sendMessage=async(req,res)=>{
try{
 const {message}=req.body;
 const {id:recieverId}=req.params;
 const senderId=req.user._id;
 
 let chats=await Conversation.findOne({
    participants:{$all:[senderId,recieverId]}
 })
 if(!chats){
    chats=await Conversation.create({
        participants:[senderId,recieverId],
    })
 }

 const newMessages=new Message({
senderId,
recieverId,
message,
conversationId:chats._id
 })
 if(newMessages){
    chats.messages.push(newMessages._id);
 }

 
 //Socket.io function
 await Promise.all([chats.save(),newMessages.save()]);

 res.status(201).send(newMessages)

}
catch(err)
{
    res.status(500).send({success:false,
        message:"An error occurred while sending the message"
    })
    console.log(err);
}
}



export const getMessage=async(req,res)=>{
    try{
      const {id:recieverId}=req.params;
 const senderId=req.user._id;

 const chats=await Conversation.findOne({
    participants:{$all:[senderId,recieverId]}
 }).populate("messages")

 if(!chats)
    return res.status(200).send([]);
   const message=chats.message;
   res.status(200).send(message);
    }
    catch(err)
    {
        res.status(500).send({success:false,
            message:"An error occurred while getting the messages"
        })
        console.log(err);
    }
}