import React from "react";
import { Redirect } from "react-router-dom";




export const InfoSidebar = (props) => {
  const friendId = props.location.pathname.split("/")[3] - 0;
  
  if (!!friendId && props.name === '') {
    return <Redirect to="/" />;
  }

  const handleDelete = () => {
      props.deleteFriend(friendId);
      // props.history.push("/");
  };

  const deleteFriendButton = () => {
    if (friendId) {
      return <button id="delete-friend-btn" onClick={handleDelete}>Delete Friend</button>;
    }
  };

  const balanceDisplay = () => {
    if (Math.abs(props.balance) < 0.01) {
      return <h1 id="balance-settled">You are all settled up</h1>;
    }
    if (friendId) {
      if ((props.balance) < 0) {
        return(
          <div id="balance-owed">
            <h1>You owe {props.name}</h1>
            <h2>${(props.balance * -1).toFixed(2)}</h2>
          </div>
        );
      } else {
        return(
          <div id="balance-lent">
            <h1>{props.name} owes you</h1>
            <h2>${props.balance.toFixed(2)}</h2>
          </div>
        );
      }
    } else {
      if ((props.balance) < 0) {
        return(
          <div id="balance-owed">
            <h1>You owe</h1>
            <h2>${(props.balance * -1).toFixed(2)}</h2>
          </div>
        );
      } else {
        return(
          <div id="balance-lent">
            <h1>You are owed</h1>
            <h2>${props.balance.toFixed(2)}</h2>
          </div>
        );
      }
    }
  };

  return(
    <div className="info-sidebar">
      <h1 id="info-header">{friendId ? "Your balance" : "Your total balance"}</h1>
      {balanceDisplay()}
      {deleteFriendButton()}
      <span>
        <a href="https://github.com/mm31415/splitWiseClone" target="_blank"><i className="fa fa-github"></i></a>
        <a href="https://www.linkedin.com/in/mark-martinez-62975b124/" target="_blank"><i className="fa fa-linkedin-square"></i></a>
      </span>
    </div>
  );
}
