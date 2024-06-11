const express=require("express");
const router=express.Router();
const {createChat,findUserChats,findChat} =require("../controllers/chatContr");

router.post("/createChat",createChat);
router.get("/chats/:userId",findUserChats);
router.get("/chat/:firstId/:secondId",findChat);


module.exports=router;