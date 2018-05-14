import {
  RECEIVE_BILL_ERRORS, RESET_BILL_ERRORS, RECEIVE_BILL
} from "../../actions/bill_actions";

export const BillErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_BILL_ERRORS:
      return action.errors;
    case RECEIVE_BILL:
    case RESET_BILL_ERRORS:
      return [];
    default:
      return oldState;
  }
};
