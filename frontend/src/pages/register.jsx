import { Alert, Form, Row, Col, Stack, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
 
const Register = () => {
   const {registerInfo,updateRegisterInfo,registerUser,registerError,registerLoading}=useContext(AuthContext);
    

  return (
    <Form onSubmit={registerUser}>
      <Row
        className="d-flex justify-content-center"
        style={{ paddingTop: "10%" }}
      >
        <Col xs={6}>
          <Stack gap={3}>
          <h2>Welcome to <b className="text-primary">Celestial</b>  where stars connect.</h2>
             
            <h3>Register</h3>
             
         
            
            <Form.Control type="text" placeholder="UserName" onChange={(e)=>{updateRegisterInfo({...registerInfo,username:e.target.value})}} />
            <Form.Control type="email" placeholder="Email" onChange={(e)=>{updateRegisterInfo({...registerInfo,email:e.target.value})}} />
            <Form.Control type="password" placeholder="Password"onChange={(e)=>{updateRegisterInfo({...registerInfo,password:e.target.value})}} />
            <Button type="submit" variant="primary">
               {registerLoading? "Creating your account" : "Register"}
                
            </Button>
            {registerError?.error && (<Alert variant="danger">{registerError?.message}</Alert>)}
             
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
