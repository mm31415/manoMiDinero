import { connect } from "react-redux";
import { withRouter } from "react-router";
import Dashboard from "./dashboard";

const mapStateToProps = state => {
  const bills = Object.values(state.entities.bills);
  const payments = Object.values(state.entities.payments);
  let expenses = bills.concat(payments);
  return {
    expenses: expenses,
    users: state.entities.users,
    logged_in: state.session.id || false
  };
};

const dashboard = connect(mapStateToProps)(Dashboard);

export default withRouter(dashboard);
