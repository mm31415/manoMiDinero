import { connect } from "react-redux";
import BillModal from "./bill_modal";
import { addBill, removeEditBillId } from "../../actions/bill_actions";
import merge from "lodash/merge";

const mapStateToProps = state => {
  // debugger
  const friends = merge({}, state.entities.users);
  delete friends[state.session.id];
  return {
    friends_arr: Object.values(friends).sort(
      (a,b) => a.name.toLowerCase() > b.name.toLowerCase()
    ),
    friends_obj: friends,
    currentUserId: state.session.id,
    bill: state.entities.bills[state.entities.edit.billId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (bill, friend) =>  dispatch(addBill(bill, friend)),
    removeEditBillId: () => dispatch(removeEditBillId())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillModal);
