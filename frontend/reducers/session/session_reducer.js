import { RECEIVE_USER, LOGOUT_USER, ADD_LOGOUT } from "../../actions/session_actions";
import merge from 'lodash/merge';

export const SessionReducer = (oldState = { id: null }, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_USER:
      return { id: action.user.id };
    case LOGOUT_USER:
      return { id: null };
    case ADD_LOGOUT:
      return  merge({}, oldState, { action: "Logging Out" });
    default:
      return oldState;
  }
};
