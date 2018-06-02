import { InfoSidebar } from "./info_sidebar";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { deleteFriend } from "../../actions/friendship_actions";
import { mapFriendExpenses, balance } from "../../util/function_util";

const mapStateToProps = (state, ownProps) => {
  const friendId = ownProps.location.pathname.split("/")[3] - 0;
  let expenses;
  if (friendId) {
    expenses = mapFriendExpenses(
      Object.assign({}, state.entities.bills),
      Object.assign({}, state.entities.payments),
      friendId
    );
  } else {
    const bills = Object.values(state.entities.bills);
    const payments = Object.values(state.entities.payments);
    expenses = bills.concat(payments);
  }
  return {
    name: state.entities.users[friendId] ? state.entities.users[friendId].name : '',
    balance: balance(expenses, state.session.id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFriend: (id) => dispatch(deleteFriend(id))
  };
};

const infoSidebar = connect(mapStateToProps, mapDispatchToProps)(InfoSidebar);

export default withRouter(infoSidebar);
