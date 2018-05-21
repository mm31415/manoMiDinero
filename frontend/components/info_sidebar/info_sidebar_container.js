import { InfoSidebar } from "./info_sidebar";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { deleteFriend } from "../../actions/friendship_actions";
import { mapAndSortFriendBills, balance } from "../../util/function_util";

const mapStateToProps = (state, ownProps) => {
  const friendId = ownProps.location.pathname.split("/")[3] - 0;
  let bills;
  if (friendId) {
    bills = mapAndSortFriendBills(
      Object.assign({}, state.entities.bills), friendId
    );
  } else {
    bills = Object.values(state.entities.bills)
  }
  return {
    name: state.entities.users[friendId] ? state.entities.users[friendId].name : '',
    balance: balance(bills, state.session.id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFriend: (id) => dispatch(deleteFriend(id))
  };
};

const infoSidebar = connect(mapStateToProps, mapDispatchToProps)(InfoSidebar);

export default withRouter(infoSidebar);
