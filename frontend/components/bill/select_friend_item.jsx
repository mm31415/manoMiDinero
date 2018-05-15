import React from "react";

export const SelectFriendItem = (props) => {
  return (
    <li onClick={props.setFriend} value={props.friend.id}
    label={props.friend.name} className="name-li">
    {props.friend.name}
    </li>
  );
};
