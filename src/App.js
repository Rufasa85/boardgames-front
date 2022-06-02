import { useEffect,useState } from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Login from "./pages/Login";
import API from "./utils/API"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token,setToken] = useState(null)
  useEffect(()=>{
    const savedToken = localStorage.getItem("token");
    if(savedToken){
      setToken(savedToken)
    }
  },[])
  useEffect(()=>{
   if(token){
      API.verify(token).then(userData=>{
        if(userData.userId){
          setIsLoggedIn(true);
          setUserId(userData.userId)
        } else {
          setIsLoggedIn(false);
          setUserId(null)
        }
      }) 
    }
  },[token])
  const handleLoginSubmit=loginData =>{
    console.log("handle login",loginData)
    API.login(loginData).then(data=>{
      if(data.token){
        setToken(data.token)
        localStorage.setItem("token",data.token)
      }
    })
  }
  const handleSignupSubmit=signupData =>{
    API.signup(signupData).then(data=>{
      if(data.token){
        setToken(data.token)
        localStorage.setItem("token",data.token)
      }
    })
  }
  return (
   <BrowserRouter>
   <h1>Navbar</h1>
   <hr/>
   <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/profile/:id" element={<Profile/>}/>
     <Route path="/game/:id" element={<Game/>}/>
     <Route path="/login" element={<Login login={handleLoginSubmit} signup={handleSignupSubmit}/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
