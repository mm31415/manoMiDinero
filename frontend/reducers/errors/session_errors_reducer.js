import {
  RECEIVE_SESSION_ERRORS, RECEIVE_USER,
  LOGOUT_USER, RESET_SESSION_ERRORS } from "../../actions/session_actions";

export const SessionErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_USER:
    case LOGOUT_USER:
    case RESET_SESSION_ERRORS:
      return [];
    default:
      return oldState;
  }
};
