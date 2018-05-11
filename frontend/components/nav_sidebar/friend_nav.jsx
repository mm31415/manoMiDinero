import React from "react";
import { FriendItem } from "./friend_item";

export const FriendNav = (props) => {
  const friendLis = props.friends.map((friend) => {
    return <FriendItem checkPathId={props.checkPathId} key={friend.id} friend={friend} />;
    });
  return (
    <ul className="friend-nav">
      <li id="friendNav-header">Friends <i className="fa fa-plus" />add</li>
      {friendLis}
    </ul>
  );
};
