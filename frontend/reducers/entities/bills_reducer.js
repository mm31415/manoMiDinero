import {
  RECEIVE_BILLS, RECEIVE_BILL,
  REMOVE_BILL } from "../../actions/bill_actions";
import { REMOVE_FRIEND } from "../../actions/friendship_actions";
import merge from 'lodash/merge';

export const BillsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch(action.type) {
    case RECEIVE_BILLS:
      let tempState = {};
      action.bills.forEach((bill) => {
        tempState[bill.id] = bill;
      });
      return tempState;
    case RECEIVE_BILL:
      return merge({}, oldState, { [action.bill.id]: action.bill });
    case REMOVE_BILL:
      delete newState[action.billId]
      return newState;
    case REMOVE_FRIEND:
      action.billIds.forEach((id) => {
        delete newState[id]
      });
      return newState;
    default:
      return oldState;
  }
};
