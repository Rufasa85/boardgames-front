import React,{useState,useEffect} from 'react'
import "./style.css"
import UserCard from "../../components/UserCard"
import API from "../../utils/API.js"

export default function Home() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    API.getAllUsers().then(userData=>{
      setUsers(userData)
    })
  },[])

  return (
    <div className="Home">
      {users.map(user=><UserCard key={user.id} username={user.username} Games={user.Games} id={user.id}/>)}
    </div>
  )
}
