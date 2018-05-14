//////
/////  I don't think i need this
/////  I planning on return a bill with it's payments and
/////  splits nested within the bill
////

import {
  RECEIVE_SPLITS, RECEIVE_PAYMENTS
} from "../../actions/bill_actions";
import merge from "lodash/merge";

export const SplitsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_SPLITS:
      return action.splits;
    default:
      return oldState;
  }
};

export const PaymentsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_PAYMENTS:
      return action.payments;
    default:
      return oldState;
  }
};
