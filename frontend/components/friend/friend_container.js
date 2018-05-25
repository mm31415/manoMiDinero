import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Expense } from "../expense/expense";
import { fetchFriends } from "../../actions/friendship_actions";
import { deleteBill, addEditBillId } from "../../actions/bill_actions";
import { mapAndSortFriendBills } from "../../util/function_util";


const mapStateToProps = (state, ownProps) => {
  const friendId = ownProps.match.params.friendId;
  const friendBills = mapAndSortFriendBills(
    Object.assign({}, state.entities.bills), friendId);
  return {
    bills: friendBills,
    logged_in: state.session.id || false,
    users: state.entities.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFriends: () => dispatch(fetchFriends()),
    deleteBill: (id) => dispatch(deleteBill(id)),
    addEditBillId: (id) => dispatch(addEditBillId(id))
  };
};

const friendExpense = connect(mapStateToProps, mapDispatchToProps)(Expense);

export default withRouter(friendExpense);
