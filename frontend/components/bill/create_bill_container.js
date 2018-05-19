import { connect } from "react-redux";
import BillModal from "./bill_modal";
import { addBill } from "../../actions/bill_actions";
import merge from "lodash/merge";

const mapStateToProps = state => {
  const friends = merge({}, state.entities.users);
  delete friends[state.session.id];
  return {
    friends_arr: Object.values(friends).sort(
      (a,b) => a.name.toLowerCase() > b.name.toLowerCase()
    ),
    friends_obj: friends,
    currentUserId: state.session.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (bill, friend) =>  dispatch(addBill(bill, friend))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillModal);
