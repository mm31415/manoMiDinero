import { ADD_EDIT_BILL_ID,
  REMOVE_EDIT_BILL_ID } from "../../actions/bill_actions";

export const EditReducer = (oldState = { billId: null }, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case ADD_EDIT_BILL_ID:
      return { billId: action.billId };
    case REMOVE_EDIT_BILL_ID:
      return { billId : null };
    default:
      return oldState;
  }
};
