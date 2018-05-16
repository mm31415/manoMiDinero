import { connect } from "react-redux";
import { withRouter } from "react-router";
import MainContent from "./main";
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

const mainContent = connect(mapStateToProps, mapDispatchToProps)(MainContent);

export default withRouter(mainContent);
