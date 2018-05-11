import React from "react";
import { FriendItem } from "./friend_item";

export const FriendNav = (props) => {
  const friendLis = props.friends.map((friend) => {
    return <FriendItem key={friend.id} name={friend.name} />;
    });
  return (
    <ul>
      <li id="friendNav-header">Friends +add</li>
      {friendLis}
    </ul>
  );
};
