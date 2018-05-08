import * as SessionApiUtil from "../util/session_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";

const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user: user
  };
};

const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const signup = (user) => {
  return (dispatch) => {
    return SessionApiUtil.signup(user).then(user => {
      return dispatch(receiveUser(user));
    });
  };
};

export const signin = (user) => {
  return (dispatch) => {
    return SessionApiUtil.signin(user).then(user => {
      return dispatch(receiveUser(user));
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return SessionApiUtil.logout().then(() => {
      return dispatch(logoutUser());
    });
  };
};
