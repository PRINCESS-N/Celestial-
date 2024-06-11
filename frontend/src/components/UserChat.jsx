import { Stack } from "react-bootstrap";
import { usefetchRecipient } from "../hooks/fetchRecipient";
import avatar from "../assets/undraw_pic_profile_re_7g2h.svg"
import { useContext } from "react";
import { ChatContext } from "../context/ChatContex";
import { unreadNotifications } from "../utils/unreadnotifications";
import { useFetchLatestMessage } from "../hooks/ferchLatestMessage";
import moment from "moment";
 

const UserChat = ({ chat, user }) => {
    const { recipientUser, recipientError} = usefetchRecipient(chat, user);
    const {onlineUsers,notifications,markUserNotificationAsRead,currentChat} =useContext(ChatContext);
    const unreadnotifications=unreadNotifications(notifications);
    const{LatestMessage}=useFetchLatestMessage(chat);
    console.log(recipientUser);
     

    const UserNotification=unreadnotifications.filter(un=>un.senderId === recipientUser._id);

    const truncatText=(text)=>{
        let smallText=text.substring(0,20);
        if(text.length > 20){
            smallText=smallText + "..."

        }
        return smallText
    }
     
    return (
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button" onClick={()=>{
            if(UserNotification?.length !== 0){
                markUserNotificationAsRead(UserNotification,notifications);
            }
        }}>
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} height={40}/>
                </div>
                
                <div className="text-content">
                    <div className="name">{recipientUser?.username}</div>
                    <div className="text">{LatestMessage?.message && <span>{truncatText(LatestMessage?.message)}</span>}</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">{moment(LatestMessage?.createdAt).calendar()}</div>
                <div className={ UserNotification?.length >0 ? "this-user-notifications" : ""}>{UserNotification?.length >0 ? UserNotification?.length : ""}</div>
                <span className={ onlineUsers?.some((user)=>user?.userId === recipientUser?._id )? "user-online" : ""}></span>
            </div>
            
        </Stack>
    );
}

export default UserChat;
