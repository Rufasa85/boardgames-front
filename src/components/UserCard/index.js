import React from 'react'
import {Link} from "react-router-dom"

export default function UserCard(props) {
  return (
    <Link to={`/profile/${props.id}`}>
    <div className="UserCard">
       <h3>{props.username} has {props.Games.length} games!</h3>
    </div>
    </Link>
  )
}
