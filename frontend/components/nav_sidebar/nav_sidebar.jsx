import React from "react";
import { MainNav } from "./main_nav";
import { FriendNav } from "./friend_nav";


export const NavSidebar = (props) => {
  return (
    <div className="nav-sidebar">
      <MainNav location={props.location.pathname} />
      <FriendNav location={props.location.pathname}
        friends={props.friends} resetFriendshipErrors={props.resetFriendshipErrors} />
    </div>
  );
};
