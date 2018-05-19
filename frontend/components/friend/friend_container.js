import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Expense } from "../expense/expense";
import { fetchFriends } from "../../actions/friendship_actions";
import { deleteBill } from "../../actions/bill_actions";
import { combineDate } from "../../util/function_util";


const mapStateToProps = (state, ownProps) => {
  const friendId = ownProps.match.params.friendId;
  const friendBills = [];
  Object.values(state.entities.bills).forEach((value) => {
    if (value.splits[0].user_id == friendId || value.splits[1].user_id == friendId) {
      friendBills.push(value);
    }
  });
  return {
    bills: friendBills.sort((a,b) => combineDate(b.date) - combineDate(a.date)),
    logged_in: state.session.id || false,
    users: state.entities.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFriends: () => dispatch(fetchFriends()),
    deleteBill: (id) => dispatch(deleteBill(id))
  };
};

const friendExpense = connect(mapStateToProps, mapDispatchToProps)(Expense);

export default withRouter(friendExpense);
