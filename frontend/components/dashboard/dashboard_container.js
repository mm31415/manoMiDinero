import { connect } from "react-redux";
import { withRouter } from "react-router";
import Dashboard from "./dashboard";
import merge from 'lodash/merge';
import { mapFriendExpenses } from "../../util/function_util";

const mapStateToProps = state => {
  const bills = Object.values(state.entities.bills);
  const payments = Object.values(state.entities.payments);
  let expenses = bills.concat(payments);

  const friends = merge({}, state.entities.users);
  delete friends[state.session.id];
  const friendIds = Object.values(friends).map((fr) => fr.id);
  const friendArr = Object.values(friends);
  const friendExpenses = {};
  friendArr.forEach((friend) => {
    friendExpenses[friend.id] = mapFriendExpenses(
        Object.assign({}, state.entities.bills),
        Object.assign({}, state.entities.payments),
        friend.id
      );
  });
  
  return {
    expenses: expenses,
    friendExpenses: friendExpenses,
    users: state.entities.users,
    friendIds: friendIds,
    logged_in: state.session.id || false
  };
};

const dashboard = connect(mapStateToProps)(Dashboard);

export default withRouter(dashboard);
