import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, postRequest, baseUrl } from "../utils/service";
import {io} from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [userChatsLoading, setUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [currentChat , setCurrentChat]=useState(null);
  const [messages , setMessages]=useState(null);
  const [messagesError , setMessagesError]=useState(null);
  const [messagesLoading , setMessagesLoading]=useState(false);
  const[newMessage , setNewMessage]=useState(null);
  const [newMesageError , setNewMessageError]=useState(null);
  const[socket , setSocket]=useState(null);
  const[onlineUsers , setOnlineUsers]=useState([]);
  const [notifications,setNotifications]=useState([]);
  const [allUsers , setAllUsers]=useState([]);

  
   


  console.log("Current chat is :",currentChat);
  console.log("Current messages is :",messages);
  console.log("Online users",onlineUsers);
  console.log("notifictions",notifications);
  console.log("all users",allUsers);



  useEffect(()=>{
    const newSocket=io("http://localhost:3000");
    setSocket(newSocket);

    return ()=>{
      newSocket.disconnect()

    }
      
    
  },[user]);
  useEffect(()=>{
    if(socket===null) return 
    socket.emit("addNewUser",user?._id);
    socket.on("getOnlineUsers",(res)=>{
      setOnlineUsers(res);
      
    })
    return ()=>{
      socket.off("getOnlineUsers")
    }
  },[socket]);
  const recipientId = currentChat?.members?.find((id) => id !== user._id);
 

  useEffect(()=>{
    if(socket===null) return 
    socket.emit("newMessage",{...newMessage,recipientId})
  },[newMessage])

  //receive message

  useEffect(()=>{
    if(socket === null) return 
    socket.on("getMessage",response =>{
       if(currentChat?._id !== response.chatId) return 
       setMessages((prev)=>[...prev,response]);
    });
    socket.on("getNotification",response=>{
      const isChatOpened=currentChat?.members.some(id=>id === response.senderId)
      if(isChatOpened){
        setNotifications(prev=>[{...response,isRead:true},...prev]);

      }else{
        setNotifications(prev =>[response,...prev]);
      }
       
    })

    return()=>{
      socket.off("getMessage");
      socket.off("getNotification");
    }
  },[socket,currentChat]); 

  const updateCurrentChat=useCallback((chat)=>{
    setCurrentChat(chat);
  })

  const createChat=useCallback(async(firstId,secondId)=>{
    const response=await postRequest(`${baseUrl}/conver/createChat`,JSON.stringify({firstId,secondId}));
    if(response.error){
      return console.log(response.error);
    }
    setUserChats((prev)=>[...prev,response]);
  });

  const createMessage=useCallback(async(info,sender,currentChatId,setTextMessage)=>{
    if(!info){
      return console.log("No message");
    }
    const response=await postRequest(`${baseUrl}/messages/createMessage`,JSON.stringify({chatId:currentChatId ,senderId:sender._id , message:info }));
     if(response.error){
      newMesageError(response);
     }

     setNewMessage(response);
     setMessages((prev)=>[...prev,response]);
     setTextMessage("");
  })

  useEffect(() => {
    const fetchUserChats = async () => {
      if (user?._id) {
        setUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/conver/chats/${user?._id}`);
        setUserChatsLoading(false);
        if (response.error) {
          setUserChatsError(response);
        } else {
          setUserChats(response);
        }
      }
    };

    fetchUserChats();
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      setUsersError(null);

      const response = await getRequest(`${baseUrl}/users/findUsers`);
      setUsersLoading(false);

      if (response.error) {
        setUsersError(response);
        console.error("An error occurred:", response.error);
      } else {
        // console.log("Fetched users:", response);  
        setAllUsers(response);
        const availableUsers = response.filter((userOn) => {
          if (user?._id === userOn._id) return false;

          let chatExists = false;
          if (userChats) {
            chatExists = userChats.some((chat) => {
              return chat.members.includes(userOn._id);
            });
          }
          return !chatExists;
        });

        // console.log("Available users:", availableUsers);
        setUsers(availableUsers);
      }
    };

     
      fetchUsers();
  }, [userChats]);


  useEffect(() => {
    const fetchMessages = async () => {
        setMessagesLoading(true);
        setMessagesError(null);
        const response = await getRequest(`${baseUrl}/messages/info/${currentChat?._id}`);
        setMessagesLoading(false);
        if (response.error) {
          setMessagesError(response);
        } else {
          setMessages(response);
        }
      
    };

    fetchMessages();
  }, [currentChat]);

  const markAllAsRead=useCallback((notifications)=>{
    const Cnotifications=notifications.map(n=>{ return {...n,isRead:true}})

    setNotifications(Cnotifications);
  },[]);

  const markAsRead=useCallback((SelectedNotification,userChats,user,notifications)=>{

    const wantedChat=userChats.find((chat)=>{
      const chatMembers=[user._id,SelectedNotification.senderId];
      const isWanted=chat?.members.every((member)=>{
      return chatMembers.includes(member)}
    );
      return isWanted;
    });

    const ChangedNotification=notifications.map(notification=>{
      if(notification.senderId === SelectedNotification.senderId){
        return {...SelectedNotification,isRead:true}
      }else{
        return notification
      }
    })

    

    setCurrentChat(wantedChat);
    setNotifications(ChangedNotification);


  },[]);

  const markUserNotificationAsRead=useCallback((UserNotification,notifications)=>{

    const ChangedNotification=notifications.map((n)=>{
      let notification;
      UserNotification.forEach((single)=>{
        if(n.senderId === single.senderId){
          notification={...single,isRead:true};

        }else{
          notification=n
        }
      })
      return notification
    })
    setNotifications(ChangedNotification);
     
  },[])

  return (
    <ChatContext.Provider value={{ userChats, userChatsError, userChatsLoading, users, usersError, usersLoading,createChat,updateCurrentChat,messages,messagesLoading,currentChat,createMessage,onlineUsers,allUsers,notifications,markAllAsRead,markAsRead,markUserNotificationAsRead}}>
      {children}
    </ChatContext.Provider>
  );
};
