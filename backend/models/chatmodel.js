const mongoose=require("mongoose");
const chatSchema=new mongoose.Schema({
    members:Array
},{timestamps:true});

const chatModel=new mongoose.model("Chat",chatSchema);
module.exports=chatModel;