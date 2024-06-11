import { useContext } from "react";
import {Container,Stack} from "react-bootstrap"
import {Link} from 'react-router-dom'
import { AuthContext } from "../context/AuthContex";
import Notifications from "./Notifications";
const Navbar = () => {
    const {user,logoutUser}=useContext(AuthContext);
    return (
            
            <Container bg="dark" className="mb-4 d-flex flex-direction-row  "  >
                <Link to="/" className="link-light text-decoration-none  me-auto "><span className="app d-flex"><span className="logo text-primary">C</span><p className="text-decoration-underline">elestial</p></span><div className="moving"></div></Link>
                { user && <span className="link-light text-decoration-none d-flex justify-content-center me-auto text-warning">Logged in as {user?.name}</span> }
                <Stack direction="horizontal" gap={4}>
                    <Notifications/>
                    {user && <Link  onClick={logoutUser} to="/login" className="link-light text-decoration-none">Logout</Link> }
                    {!user && <>
                        <Link to="/login" className="link-light text-decoration-none">Login</Link>
                    <Link to="/register" className="link-light text-decoration-none">Register</Link>
                    </> }
                     
                </Stack>
        
            </Container>
             
             
  
        );
}
 
export default Navbar;