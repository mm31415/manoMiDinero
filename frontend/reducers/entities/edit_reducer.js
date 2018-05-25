import { ADD_EDIT_BILL_ID } from "../../actions/bill_actions";

export const EditReducer = (oldState = { billId: null }, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case ADD_EDIT_BILL_ID:
      return { billId: action.billId }
    default:
      return oldState;
  }
};
