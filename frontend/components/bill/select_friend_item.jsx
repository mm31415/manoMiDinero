import React from "react";

export const SelectFriendItem = (props) => {

  const hideSearch = (e) => {
    props.setFriend(e);
    const searchBox = document.getElementById("friend-search");
    searchBox.style.display = "none";
  }

  return (
    <li onClick={hideSearch} value={props.friend.id}
    label={props.friend.name} className="name-li">

    <span>
      <img src={window.staticImages.avatar} />&nbsp;
      {props.friend.name}
    </span>
    </li>
  );
};
