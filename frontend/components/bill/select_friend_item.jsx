import React from "react";

export const SelectFriendItem = (props) => {
  return <option value={props.friend.id}>{props.friend.name}</option>;
}
