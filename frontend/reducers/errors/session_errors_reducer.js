import { RECEIVE_SESSION_ERRORS, RECEIVE_USER } from "../../actions/session_actions";

export const SessionErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_USER:
      return [];
    default:
      return oldState;
  }
};
