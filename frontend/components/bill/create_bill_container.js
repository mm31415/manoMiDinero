import { connect } from "react-redux";
import BillModal from "./bill_modal";
import merge from "lodash/merge";

const mapStateToProps = state => {
  const friends = merge({}, state.entities.users);
  delete friends[state.session.id];
  return {
    friends_arr: Object.values(friends),
    friends_obj: friends,
    currentUserId: state.session.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addBill: (bill, splits) =>  dispatch(addBill(bill, splits))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillModal);
