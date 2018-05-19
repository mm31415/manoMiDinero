import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Expense } from "./expense";
import { fetchFriends } from "../../actions/friendship_actions";
import { deleteBill } from "../../actions/bill_actions";
import { combineDate } from "../../util/function_util";

const mapStateToProps = state => {
  return {
    bills: Object.values(state.entities.bills).
      sort((a,b) => combineDate(b.date) - combineDate(a.date)),
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

const expense = connect(mapStateToProps, mapDispatchToProps)(Expense);

export default withRouter(expense);
