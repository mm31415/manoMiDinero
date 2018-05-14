import { connect } from "react-redux";
import BillModal from "./bill_modal";
import merge from "lodash/merge";

const mapStateToProps = state => {
  const friends = merge({}, state.entities.users);
  delete friends[state.session.id];
  return {
    friends: Object.values(friends)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addBill: (bill, splits) =>  dispatch(addBill(bill, splits))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillModal);
