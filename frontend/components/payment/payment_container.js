import { connect } from "react-redux";
import PaymentModal from "./payment_modal";
import { addPayment } from "../../actions/payment_actions";
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
    addPayment: (payment) =>  dispatch(addPayment(payment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
