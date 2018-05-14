import { RECEIVE_BILL, REMOVE_BILL } from "../../actions/bill_actions";
import merge from 'lodash/merge';

export const BillsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_BILL:
      return merge({}, oldState, { [action.bill.id]: action.bill });
    case REMOVE_BILL:
      const newState = merge({}, oldState);
      delete newState[action.bill.id]
      return newState;
    default:
      return oldState;
  }
};
