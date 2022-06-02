import React from 'react'

export default function UserCard(props) {
  return (
    <div className="UserCard">
       <h3>{props.username} has {props.Games.length} games!</h3>
    </div>
  )
}
