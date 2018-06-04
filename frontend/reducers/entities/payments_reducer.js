import {
  RECEIVE_PAYMENT, RECEIVE_PAYMENTS
} from "../../actions/payment_actions";
import { REMOVE_FRIEND } from "../../actions/friendship_actions";
import merge from "lodash/merge";

export const PaymentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_PAYMENTS:
      let tempState = {};
      action.payments.forEach((payment) => {
        tempState[payment.id] = payment
      });
      return tempState;
    case RECEIVE_PAYMENT:
      return merge({}, oldState, { [action.payment.id]: action.payment });
    case REMOVE_FRIEND:
      let newState = merge({}, oldState);
      action.paymentIds.forEach((id) => {
        delete newState[id]
      });
      return newState;
    default:
      return oldState;
  }
};
