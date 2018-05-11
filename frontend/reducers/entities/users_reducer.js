import { RECEIVE_USER, LOGOUT_USER } from "../../actions/session_actions";
import { RECEIVE_FRIEND, REMOVE_FRIEND } from "../../actions/friendship_actions";
import merge from 'lodash/merge';

export const UsersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_USER:
      return merge({}, oldState, { [action.user.id]: action.user });
    case RECEIVE_FRIEND:
      return merge({}, tempState, { [action.friend.id]: action.friend });
    case REMOVE_FRIEND:
      const newState = merge({}, oldState);
      delete newState[action.friend.id];
      return newState;
    case LOGOUT_USER:
      return {};
    default:
      return oldState;
  }
};
