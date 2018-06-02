import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Expense } from "./expense";
import { deleteBill, addEditBillId  } from "../../actions/bill_actions";
import { combineDate } from "../../util/function_util";

const mapStateToProps = state => {
  const bills = Object.values(state.entities.bills);
  const payments = Object.values(state.entities.payments);
  let expenses = bills.concat(payments);
  debugger
  return {
    expenses: expenses.sort(
      (a,b) => combineDate(b.date) - combineDate(a.date)),
    logged_in: state.session.id || false,
    users: state.entities.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteBill: (id) => dispatch(deleteBill(id)),
    addEditBillId: (id) => dispatch(addEditBillId(id))
  };
};

const expense = connect(mapStateToProps, mapDispatchToProps)(Expense);

export default withRouter(expense);


// bills: Object.values(state.entities.bills).
//   sort((a,b) => combineDate(b.date) - combineDate(a.date)),
