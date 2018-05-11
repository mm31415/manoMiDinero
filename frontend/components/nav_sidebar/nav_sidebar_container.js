import { connect } from "react-redux";
import { NavSidebar } from "./nav_sidebar";
import { withRouter } from "react-router";
import merge from 'lodash/merge';

const mapStateToProps = state => {
  const friends = merge({}, state.entities.users);
  delete friends[state.session.id];
  return {
    friends: Object.values(friends)
  };
};

const navSidebar = connect(mapStateToProps)(NavSidebar);

export default withRouter(navSidebar);
