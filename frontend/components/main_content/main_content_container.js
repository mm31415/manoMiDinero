import { connect } from "react-redux";
import { withRouter } from "react-router";
import MainContent from "./main_content";
import { fetchFriends } from "../../actions/friendship_actions";
import { fetchBills } from "../../actions/bill_actions";

const mapStateToProps = (state, ownProps) => {
  const name = () => {
    const path = ownProps.location.pathname.split("/");
    const pathId = path[path.length - 1];
    const friend = state.entities.users[pathId]
    if (friend === undefined) {
      return '';
    } else {
      return friend.name
    }
  };
  return {
    logged_in: state.session.id || false,
    friendName: name()
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
