const chatModel=require("../models/chatmodel");



const createChat=async(req,res)=>{
    const {firstId,secondId}=req.body;
    try{
    const chat=await chatModel.findOne({members:{$all:[firstId,secondId]}});
    if(chat){
        return res.status(200).json(chat);
    }

    const newChat=await chatModel.create({
        members:[firstId,secondId]
    });
    const result=await newChat.save();
    return res.status(200).json(result);
}catch(error){
    console.log(error);
    return res.status(500).json({message:error});
}

}


const findUserChats=async(req,res)=>{
    const userId=req.params.userId;
    try{
        const chats=await chatModel.find({members:{$in:userId}});
        if(!chats){
            res.status(400).json({message:"No chats found"});
        }
        return res.status(200).json(chats);
         

    }catch(error){
        console.log(error);
        return res.status(500).json({message:error});
    }

}
const findChat=async(req,res)=>{
    const {firstId,secondId}=req.params;
    try{
    const chat=await chatModel.findOne({members:{$all:[firstId,secondId]}});
    if(!chat){
        return res.status(400).json({message:"No chat found between the users"});
    }
    return res.status(200).json(chat);
}catch(error){
    console.log(error);
    return res.status(500).json({message:error});
}
}


module.exports={findChat,findUserChats,createChat};