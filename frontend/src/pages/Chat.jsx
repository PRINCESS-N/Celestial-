import { useContext } from "react";
import { ChatContext } from "../context/ChatContex";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/UserChat";
import { AuthContext } from "../context/AuthContex";
import PotentialUsers from "../components/PotentialUsers";
import ChatBox from "../components/ChatBox";

const Chat = () => {

  const{user}=useContext(AuthContext);
  const {userChats,userChatsError,userChatsLoading,updateCurrentChat}=useContext(ChatContext);
  console.log("Chats",userChats);
    return (
       <Container>
        <PotentialUsers/>
        {userChatsError?.length <1 ? null :(<Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className=" message-box flex-grow-0 pe-3" gap={3}>
            {userChatsLoading && <p>Loading chats ...</p>}
            {userChats?.map((chat,index)=>{
              return(
                <div key={index} onClick={()=>updateCurrentChat(chat)}>
                  <UserChat chat={chat}  user={user}></UserChat>
                </div>
              )

            })}
            </Stack>
          <ChatBox/>
        </Stack>)}
       
       
       </Container>
    );
  }
  
  export default Chat;
  