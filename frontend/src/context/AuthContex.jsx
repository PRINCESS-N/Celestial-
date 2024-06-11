import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false); 
  const [loginLoading, setloginLoading] = useState(false); 
  const [loginError, setloginError] = useState(null); 
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const[loginInfo,setloginInfo]=useState({
    email:"",
    password:""
  });

  const updateloginInfo=useCallback((info)=>{
    setloginInfo(info);
  },[]);
  console.log(loginInfo);

   

   

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterLoading(true);
      setRegisterError(null);
      const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
      setRegisterLoading(false);
      if (response.error) {
        return setRegisterError(response);
      }
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  const loginUser=useCallback(async(e)=>{
    e.preventDefault();
    setloginLoading(true);
    setloginError(null);
    const response=await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo));
    setloginLoading(false);
    if(response.error){
      return setloginError(response);
    }
    localStorage.setItem("user",JSON.stringify(response));
    setUser(response);
    
  },[loginInfo]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  console.log("User", user);
  const logoutUser=useCallback(()=>{
    localStorage.removeItem("user");
    setUser(null);

  },[]);

  return (
    <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerUser, registerError, registerLoading,logoutUser,loginInfo,updateloginInfo,loginError,loginLoading,loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
