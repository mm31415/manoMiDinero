import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Expense } from "./expense";
import { deleteBill, addEditBillId  } from "../../actions/bill_actions";
import { combineDate } from "../../util/function_util";

const mapStateToProps = state => {
  return {
    bills: Object.values(state.entities.bills).
      sort((a,b) => combineDate(b.date) - combineDate(a.date)),
    payments: Object.values(state.entities.payments),
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
