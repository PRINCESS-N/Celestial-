const mongoose=require('mongoose');
const url="your\url\to\your\database";
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
