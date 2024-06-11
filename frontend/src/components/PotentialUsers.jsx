import { useContext } from "react";
import { ChatContext } from "../context/ChatContex";
import { AuthContext } from "../context/AuthContex";

const PotentialUsers = () => {
    const {user}=useContext(AuthContext);
    const {users,createChat,onlineUsers}=useContext(ChatContext);
    console.log(users);
    return ( <>
    <div className="all-users">
        {users && users.map((one,index)=>{
            return(<div className="single-user" key={index} onClick={()=>createChat(user._id,one._id)} >
                {one.username}
             <span className={ onlineUsers?.some((user)=>user?.userId === one._id )? "user-online" : ""}></span>
            </div>)
            
        })}
    </div>
    </> );
}
 
export default PotentialUsers;