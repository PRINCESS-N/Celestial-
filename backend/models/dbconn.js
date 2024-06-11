const mongoose=require('mongoose');
const url="mongodb://127.0.0.1/ChatApp";
function connection(){
    try{
        mongoose.connect(url);

    }catch(error){
        console.log(error);
        
    }
    const dbconn=mongoose.connection;
    dbconn.once("open",()=>{
        console.log("Connected ");
    });
    dbconn.on("error",(error)=>{
        console.log(error);
    })
}
connection();
module.exports=connection;