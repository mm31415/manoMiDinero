import React from "react";
import { Link } from "react-router-dom";

export const FriendItem = (props) => {

  const checkIfSelected = (path) => {
    if (props.location === path) {
      return "selected";
    } else {
      return "";
    }
  };

  return (
    <li className={checkIfSelected(`/main/friends/${props.friend.id}`)}>
      <Link to={`/main/friends/${props.friend.id}`}><i className="fa fa-user" />&nbsp;{props.friend.name}</Link>
    </li>
  );
};
