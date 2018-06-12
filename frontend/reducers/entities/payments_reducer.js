import {
  RECEIVE_PAYMENT, RECEIVE_PAYMENTS, REMOVE_PAYMENT
} from "../../actions/payment_actions";
import { REMOVE_FRIEND } from "../../actions/friendship_actions";
import { LOGOUT_USER } from "../../actions/session_actions";
import merge from "lodash/merge";

export const PaymentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch(action.type) {
    case RECEIVE_PAYMENTS:
      let tempState = {};
      action.payments.forEach((payment) => {
        tempState[payment.id] = payment
      });
      return tempState;
    case RECEIVE_PAYMENT:
      return merge({}, oldState, { [action.payment.id]: action.payment });
    case REMOVE_PAYMENT:
      delete newState[action.paymentId];
      return newState;
    case REMOVE_FRIEND:
      action.paymentIds.forEach((id) => {
        delete newState[id]
      });
      return newState;
    case LOGOUT_USER:
      return {};
    default:
      return oldState;
  }
};
