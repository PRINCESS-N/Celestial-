const express=require("express");
const app=express();
const config=require("config");
const port=config.get("connection.port");
const dbconn=require("./models/dbconn");
const userRouters=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const messageRoutes=require("./routes/messageRoutes");
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use("/users",userRouters);
app.use("/conver",chatRoutes);
app.use("/messages",messageRoutes);



app.listen(port,()=>{
    console.log(`Server connected on port ${port}`);
})






