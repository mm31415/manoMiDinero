import {
  RECEIVE_FRIEND,
  RECEIVE_FRIENDSHIP_ERRORS,
  RESET_FRIENDSHIP_ERRORS
} from "../../actions/friendship_actions";

export const FriendshipErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_FRIENDSHIP_ERRORS:
      return action.errors
    case RECEIVE_FRIEND:
    case RESET_FRIENDSHIP_ERRORS:
      return [];
    default:
      return oldState;
  }
};
