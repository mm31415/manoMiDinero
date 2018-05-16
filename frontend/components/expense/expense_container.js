import { connect } from "react-redux";
import { withRouter } from "react-router";
import Expense from "./expense";
import { fetchFriends } from "../../actions/friendship_actions";

const mapStateToProps = state => {
  return {
    bills: Object.values(state.entities.bills),
    logged_in: state.session.id || false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFriends: () => dispatch(fetchFriends())
  };
};

const expense = connect(mapStateToProps, mapDispatchToProps)(Expense);

export default withRouter(expense);
