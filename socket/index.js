const {Server}=require("socket.io");
const io=new Server({cors:"\url\of\your\react\app"});
let onlineUsers=[]
io.on("connection",(socket)=>{
    console.log("Established connection",socket.id);

    socket.on("addNewUser",(userId)=>{
        !onlineUsers.some(user=>user.userId === userId) &&
         onlineUsers.push({
            userId,
            socketId:socket.id
         });
         io.emit("getOnlineUsers",onlineUsers);
    });
    
    socket.on("disconnect",()=>{
        onlineUsers=onlineUsers.filter(user=> user.socketId !== socket.id );
        io.emit("getOnlineUsers",onlineUsers);

    });
    socket.on("newMessage",(message)=>{
        const user=onlineUsers.find(user=>user?.userId === message.recipientId);
        io.to(user.socketId).emit("getMessage",message);
        io.to(user.socketId).emit("getNotification",{
            senderId:message.senderId,
            isRead:false,
            data: new Date()
        });
    })
    
});
// use a port different from the one used for the frontend and the backend
io.listen(3000);

