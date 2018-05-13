import React from "react";
import { FriendItem } from "./friend_item";
import { Link } from "react-router-dom";

export const FriendNav = (props) => {

  const handleClick = (e) => {
    e.preventDefault();
    props.resetFriendshipErrors();
    const modal_form = document.getElementById("add-friend-form");
    const modal = document.getElementById("add-friend-modal");
    modal.style.display = "block";
    modal_form.classList.add("fade-in");
  }

  const friendLis = props.friends.map((friend) => {
    return <FriendItem checkPathId={props.checkPathId} key={friend.id} friend={friend} />;
    });
  return (
    <ul className="friend-nav">
      <li id="friendNav-header">Friends <Link to="/" onClick={handleClick}><i className="fa fa-plus" />add</Link></li>
      {friendLis}
    </ul>
  );
};
