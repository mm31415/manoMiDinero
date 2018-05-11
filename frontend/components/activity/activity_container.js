import { connect } from "react-redux";
import { withRouter } from "react-router";
import Activity from "./activity";
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

const activity = connect(mapStateToProps, mapDispatchToProps)(Activity);

export default withRouter(activity);
