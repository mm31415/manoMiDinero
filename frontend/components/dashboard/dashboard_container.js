import { connect } from "react-redux";
import { withRouter } from "react-router";
import Dashboard from "./dashboard";
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

const dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default withRouter(dashboard);
