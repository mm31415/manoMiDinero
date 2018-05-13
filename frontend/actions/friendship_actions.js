import * as FriendshipUtil from "../util/friendship_util";

export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const REMOVE_FRIEND = "REMOVE_FRIEND";
export const RECEIVE_FRIENDSHIP_ERRORS = "RECEIVE_FRIENDSHIP_ERRORS";
export const RESET_FRIENDSHIP_ERRORS = "RESET_FRIENDSHIP_ERRORS";

const receiveFriends = (friends) => {
  return {
    type: RECEIVE_FRIENDS,
    friends: friends
  };
};

const receiveFriend = (friend) => {
  return {
    type: RECEIVE_FRIEND,
    friend: friend
  };
};

const removeFriend = (resp) => {
  return {
    type: DELETE_FRIEND,
    friendId: resp.friendId
  };
};

const receiveFriendshipErrors = (errors) => {
  return {
    type: RECEIVE_FRIENDSHIP_ERRORS,
    errors: errors.responseJSON.errors
  };
};

export const resetFriendshipErrors = () => {
  return {
    type: RESET_FRIENDSHIP_ERRORS
  };
};

export const addFriend = (user1_id, friend_email) => {
  return (dispatch) => {
    return FriendshipUtil.addFriend(user1_id, friend_email).then(
      (friend) => { return dispatch(receiveFriend(friend)) },
      (errors) => { return dispatch(receiveFriendshipErrors(errors)) }
    );
  };
};

export const deleteFriend = (user1_id, user2_id) => {
  return (dispatch) => {
    return FriendshipUtil.deleteFriend(user1_id, user2_id).then(
      (resp) => { return dispatch(removeFriend(resp)) },
      (errors) => { return dispatch(receiveFriendshipErrors(errors)) }
    );
  };
};

export const fetchFriends = () => {
  return (dispatch) => {
    return FriendshipUtil.fetchFriends().then(({ friends }) => {
      return dispatch(receiveFriends(friends))
    });
  };
};
