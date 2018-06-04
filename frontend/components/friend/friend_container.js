import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Expense } from "../expense/expense";
import { deleteBill, addEditBillId } from "../../actions/bill_actions";
import { deletePayment } from "../../actions/payment_actions";
import { mapAndSortFriendExpenses } from "../../util/function_util";


const mapStateToProps = (state, ownProps) => {
  const friendId = ownProps.match.params.friendId;
  const friendExpenses = mapAndSortFriendExpenses(
    Object.assign({}, state.entities.bills),
    Object.assign({}, state.entities.payments),
    friendId);
  return {
    expenses: friendExpenses,
    logged_in: state.session.id || false,
    users: state.entities.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteBill: (id) => dispatch(deleteBill(id)),
    addEditBillId: (id) => dispatch(addEditBillId(id)),
    deletePayment: (paymentId) => dispatch(deletePayment(paymentId))
  };
};

const friendExpense = connect(mapStateToProps, mapDispatchToProps)(Expense);

export default withRouter(friendExpense);
