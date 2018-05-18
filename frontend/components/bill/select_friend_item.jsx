import React from "react";

export const SelectFriendItem = (props) => {

  const removeBackground = (e) => {
    let friendUlChildSelected = document.getElementById("friend-search").firstChild;
    while (true) {
      if (friendUlChildSelected === null) {
        break;
      } else {
        friendUlChild.style.removeProperty("background");
        friendUlChildSelected = friendUlChildSelected.nextSibling;
        continue;
      }
    }
  }

  const hideSearch = (e) => {
    props.setFriend(e);
    const searchBox = document.getElementById("friend-search");
    searchBox.style.display = "none";
  }
  
  return (
    <li onClick={hideSearch} value={props.friend.id}
    label={props.friend.name} className="name-li"
    onFocus={removeBackground}>

    <span>
      <img src={window.staticImages.avatar} />&nbsp;
      {props.friend.name}
    </span>
    </li>
  );
};
