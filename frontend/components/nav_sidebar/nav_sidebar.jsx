import React from "react";
import { MainNav } from "./main_nav";
import { FriendNav } from "./friend_nav";


export const NavSidebar = (props) => {
  return (
    <div>
      <MainNav location={props.history.location.pathname} />
      <FriendNav checkPathId={props.match.params.friendId} friends={props.friends} />
    </div>
  );
};
