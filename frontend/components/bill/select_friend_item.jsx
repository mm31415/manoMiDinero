import React from "react";

export const SelectFriendItem = (props) => {
  return (
    <li onClick={props.selectFriend} value={props.friend.id}
    label={props.friend.name} className="name-li">
    {props.friend.name}
    </li>
  );
};
