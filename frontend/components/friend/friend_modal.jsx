import React from "react";
import FriendshipErrorsContainer from "../errors/friendship_errors_container";



class FriendModal extends React.Component {
  constructor(props){
    super(props)
    this.state = { email: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  updateEmail(e) {
    this.setState({ email: e.currentTarget.value });
  }

  handleState(e) {
    this.setState({ email: '' });
  }

  handleSubmit (e) {
    e.preventDefault();
    const modal = document.getElementById("add-friend-modal");
    this.props.addFriend(this.props.user1_id, this.state.email).then(
      () => { modal.style.display = "none"; },
      () => { }
    );
  }

  render() {

    const modal = document.getElementById("add-friend-modal");
    document.onclick = (e) => {
      if (e.target === modal) {
        this.handleState();
        modal.style.display = "none";
      }
    };

    if (this.props.user1_id === null) {
      if (modal !== null) {
        modal.style.display = "none";
      }
    }

    return (
      <div id="add-friend-modal">
        <form id="add-friend-form">
          <h1>Here's my friend's email:</h1>
          <FriendshipErrorsContainer />
          <input type="text" placeholder="Email" onChange={this.updateEmail} value={this.state.email} />
          <button id="add-friend-btn" onClick={this.handleSubmit}>Add Friend!</button>
        </form>
      </div>
    );
  }

}

export default FriendModal;
