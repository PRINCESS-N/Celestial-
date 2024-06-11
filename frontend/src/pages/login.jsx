import { useContext } from 'react';
import {Alert,Form,Row,Col,Stack, Button} from 'react-bootstrap'
import { AuthContext } from '../context/AuthContex';
const Login = () => {
   const{loginInfo,updateloginInfo,loginError,loginLoading,loginUser}=useContext(AuthContext);
   return ( 
   <Form onSubmit={loginUser}>
     <Row className="d-flex justify-content-center" style={{paddingTop:"10%"}}>
        <Col xs={6}>
        <Stack gap={3}>
           <h2>Login</h2>
           <Form.Control type="email" placeholder="Email" onChange={(e)=>{updateloginInfo({...loginInfo,email:e.target.value})}} />
           <Form.Control type="password" placeholder="Password" onChange={(e)=>{updateloginInfo({...loginInfo,password:e.target.value})}}  />
            <Button type="submit" variant='primary'>
               {loginLoading ? "Loging in process" : "Login"}
            </Button>
            {loginError ?.error && <Alert variant='danger'>{loginError?.message}</Alert>}
            
        </Stack>


        </Col>
     </Row>

   </Form>
    
   );
}
 
export default Login;