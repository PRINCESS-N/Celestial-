const messageModel=require("../models/messagesmodel");

const createMessage=async(req,res)=>{
    const{chatId,senderId,message}=req.body;
    try{

        const newMessage=await messageModel.create({
            chatId,
            senderId,
            message
        });
        const result=await newMessage.save();

        return res.status(200).json(result);


    }catch(error){
        console.log(error);
        return res.status(500).json({message:error});
    }
}


const getMessage=async(req,res)=>{

    const chatId=req.params.chatId;
    try{

        const message=await messageModel.find({chatId});
        if(!message){
            return res.status(400).json({message:"No messages found"});
        }

        return res.status(200).json(message);
         

    }catch(error){
        console.log(error);
        return res.status(500).json({message:error});
    }
}

module.exports={getMessage,createMessage}