import React from "react";


export const InfoSidebar = (props) => {

  const handleDelete = (friendId) => {
    return e => {
      props.deleteFriend(friendId);
      props.history.push("/");
    };
  };

  const deleteFriendButton = () => {
    const friendId = props.location.pathname.split("/")[3] - 0;
    if (friendId) {
      return <button onClick={handleDelete(friendId)}>Delete Friend</button>;
    }
  };

  return(
    <div className="info-sidebar">
      <h1>this is the info sidebar</h1>
      {deleteFriendButton()}
    </div>
  );
}
