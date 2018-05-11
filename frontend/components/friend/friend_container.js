import { connect } from "react-redux";
import { withRouter } from "react-router";
import Friend from "./friend";
import { fetchFriends } from "../../actions/friendship_actions";

const mapStateToProps = state => {
  return {
    logged_in: state.session.id || false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFriends: () => dispatch(fetchFriends())
  };
};

const friend = connect(mapStateToProps, mapDispatchToProps)(Friend);

export default withRouter(friend);
