import { connect } from "react-redux";
import { NavSidebar } from "./nav_sidebar";
import { withRouter } from "react-router";
import { resetFriendshipErrors } from "../../actions/friendship_actions";
import merge from 'lodash/merge';

const mapStateToProps = state => {
  const friends = merge({}, state.entities.users);
  delete friends[state.session.id];
  return {
    friends: Object.values(friends)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetFriendshipErrors: () => dispatch(resetFriendshipErrors())
  };
};

const navSidebar = connect(mapStateToProps, mapDispatchToProps)(NavSidebar);

export default withRouter(navSidebar);
