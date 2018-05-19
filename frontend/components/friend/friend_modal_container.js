import { connect } from "react-redux";
import FriendModal from "./friend_modal";
import { addFriend } from "../../actions/friendship_actions";

const mapStateToProps = state => {
  return {
    logged_in: state.session.id,
    errors: state.errors.friendhsip
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFriend: (email) => dispatch(addFriend(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendModal);
