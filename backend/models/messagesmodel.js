const { timeStamp } = require("console");
const mongoose=require("mongoose");
const messageSchema=new mongoose.Schema({
    chatId:String,
    senderId:String,
    message:String
},{timestamps:true});
const messageModel=new mongoose.model("message",messageSchema);
module.exports=messageModel;