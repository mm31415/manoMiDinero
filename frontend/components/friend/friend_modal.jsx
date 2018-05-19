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
    this.props.addFriend(this.state.email).then(
      () => {
        this.setState({ email: '' });
        modal.style.display = "none";
      },
      () => { }
    );
  }

  render() {

    const modal = document.getElementById("add-friend-modal");
    const modal_form = document.getElementById("add-friend-form");
    const fadeOut = (e) => {
      if (e.target === modal) {
        this.handleState();
        modal_form.classList.toggle("fade-out");
        setTimeout(function() {
          modal.style.display = "none";
        }, 400);
        setTimeout(function() {
          modal_form.classList.remove("fade-out");
        }, 500);
      }
    };

    if (this.props.logged_in === null) {
      if (modal !== null) {
        modal.style.display = "none";
      }
    }

    return (
      <div id="add-friend-modal" onClick={fadeOut}>
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
