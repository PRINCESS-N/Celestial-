const express=require('express');
const router=express.Router();
const{register,login,findUsers,user}=require("../controllers/userContr");

router.post('/register',register);
router.post('/login',login);
router.get('/findUsers',findUsers);
router.get('/getuser/:userId',user);

 

module.exports=router;