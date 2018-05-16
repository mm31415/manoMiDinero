import { connect } from "react-redux";
import { withRouter } from "react-router";
import MainContent from "./main_content";
import { fetchFriends } from "../../actions/friendship_actions";
import { fetchBills } from "../../actions/bill_actions";

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    logged_in: state.session.id || false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFriends: () => dispatch(fetchFriends()),
    fetchBills: () => dispatch(fetchBills())
  };
};

const mainContent = connect(mapStateToProps, mapDispatchToProps)(MainContent);

export default withRouter(mainContent);
