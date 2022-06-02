import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
export default function Profile(props) {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [formData,setFormData] = useState({
    title:"",
    playerCount:"",
    weight:"",
    description:""
  })
  useEffect(() => {
    API.getOneUser(id).then((data) => {
      if (data.username) {
        setUserData(data);
      }
    });
  }, []);
  const handleChange= e=>{
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const formSubmit = e=>{
    e.preventDefault();
    API.createGame(formData,props.token).then(result=>{
      setFormData({
        title:"",
        playerCount:"",
        weight:"",
        description:""
      })
      API.getOneUser(id).then((data) => {
        if (data.username) {
          setUserData(data);
        }
      });
    })
  }
  return (
    <div className="Profile">
      {!userData ? (
        <h3>loading...</h3>
      ) : (
        <>
          <h1>{userData.username}'s profile!</h1>
          {userData.Games.map((game) => (
            <h3>{game.title}</h3>
          ))}
          {props.userId===userData.id?(
            <>
            <h3>Add Game</h3>
            <form onSubmit={formSubmit}>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="title"/>
              <input name="playerCount" value={formData.playerCount} onChange={handleChange} placeholder="playerCount"/>
              <input name="weight" value={formData.weight} onChange={handleChange} placeholder="weight"/>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="description"></textarea>
              <button>New Game!</button>
            </form>
            </>
          ):null}
        </>
      )}
    </div>
  );
}
