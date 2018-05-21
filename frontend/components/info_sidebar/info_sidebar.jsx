import React from "react";


export const InfoSidebar = (props) => {
  const friendId = props.location.pathname.split("/")[3] - 0;

  const handleDelete = () => {
      props.deleteFriend(friendId);
      props.history.push("/");
  };

  const deleteFriendButton = () => {
    if (friendId) {
      return <button onClick={handleDelete}>Delete Friend</button>;
    }
  };

  const balanceDisplay = () => {
    if (props.balance === 0) {
      return <h1>You are all settled up</h1>;
    }
    if (friendId) {
      if ((props.balance) < 0) {
        return(
          <div>
            <h1>You owe {props.name}</h1>
            <h2>${props.balance * -1}</h2>
          </div>
        );
      } else {
        return(
          <div>
            <h1>{props.name} owes you</h1>
            <h2>${props.balance}</h2>
          </div>
        );
      }
    } else {
      if ((props.balance) < 0) {
        return(
          <div>
            <h1>You owe</h1>
            <h2>${props.balance * -1}</h2>
          </div>
        );
      } else {
        return(
          <div>
            <h1>You are owed</h1>
            <h2>${props.balance}</h2>
          </div>
        );
      }
    }
  };

  return(
    <div className="info-sidebar">
      <h1>{friendId ? "Your balance" : "Your total balance"}</h1>
      {balanceDisplay()}
      {deleteFriendButton()}
    </div>
  );
}
