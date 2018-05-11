import React from "react";
import { Link } from "react-router-dom";

export const FriendItem = (props) => {

  const checkIfSelected = (id) => {
    if (props.checkPathId == id) {
      return "selected";
    } else {
      return "";
    }
  };

  return (
    <li className={checkIfSelected(props.friend.id)}>
      <Link to={`/friends/${props.friend.id}`}><i className="fa fa-user" />{props.friend.name}</Link>
    </li>
  );
};
