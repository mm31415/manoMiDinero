import React from "react";
import { MainNav } from "./main_nav";
import { FriendNav } from "./friend_nav";


export const NavSidebar = (props) => {
  return (
    <div>
      <MainNav />
      <FriendNav friends={props.friends} />
    </div>
  );
};
