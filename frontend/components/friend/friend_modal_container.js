import { connect } from "react-redux";
import FriendModal from "./friend_modal";
import { addFriend } from "../../actions/friendship_actions";

const mapStateToProps = state => {
  return {
    user1_id: state.session.id,
    errors: state.errors.friendhsip
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFriend: (user1_id, friend_email) => dispatch(addFriend(user1_id, friend_email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendModal);
