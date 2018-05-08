import { RECEIVE_USER } from "../../actions/session_actions";
import merge from 'lodash/merge';

export const UsersReducer = (oldState, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_USER:
      return merge({}, oldState, { [action.user.id]: action.user });
    default:
      return oldState;
  }
};
