import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/ChatContex"
import { baseUrl, getRequest } from "../utils/service";

 



 export const  useFetchLatestMessage =(chat)=>{
    const {newMessage , notifications} = useContext(ChatContext);
    const  [LatestMessage , setLatestMessage]=useState(null);

    useEffect(()=>{
        const getMessage=async()=>{
            const response = await getRequest(`${baseUrl}/messages/info/${chat?._id}`);

            if(response.error){
                return console.log("Error encountered",error);
            }
            const lastMessage=response[response?.length-1];
            setLatestMessage(lastMessage);
        };
        getMessage();

    },[newMessage,notifications]);
    return {LatestMessage}
 }