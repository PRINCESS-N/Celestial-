const express=require("express");
const router=express.Router();
const{createMessage,getMessage}=require("../controllers/messageContr");

router.post("/createMessage",createMessage);
router.get("/info/:chatId",getMessage);

module.exports=router;



