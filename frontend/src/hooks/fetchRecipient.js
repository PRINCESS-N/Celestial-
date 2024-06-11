 
 import { useEffect, useState } from "react";
 import { baseUrl, getRequest } from "../utils/service";
 
 export const usefetchRecipient = (chat, user) => {
     const [recipientUser, setRecipientUser] = useState(null);
     const [recipientError, setRecipientError] = useState(null);
 
     const recipientId = chat?.members?.find((id) => id !== user._id);
 
     useEffect(() => {
         const getUser = async () => {
             if (!recipientId) {
                 return;
             }
 
             try {
                 const response = await getRequest(`${baseUrl}/users/getuser/${recipientId}`);
                 if (response.error) {
                     setRecipientError(response);
                 } else {
                     setRecipientUser(response);
                 }
             } catch (error) {
                 setRecipientError(error);
             }
         };
 
         getUser();
     }, [recipientId]);
 
     return { recipientUser, recipientError };
 };
 