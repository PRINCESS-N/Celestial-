import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/login'
import Register from './pages/register'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from 'react-bootstrap'
import Navbar from './components/Navbar'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContex'
import { ChatContextProvider } from './context/ChatContex'
function App() {
  const {user}=useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
     <Navbar/> 
    <Container>
      <Routes>
        <Route path='/' element={user ? <Chat />: <Register/>} />
        <Route path='/register' element={user ? <Chat/> :<Register />} />
        <Route path='/login' element={user ? <Chat/> : <Login />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
    </ChatContextProvider>
     
  );
}

export default App;
