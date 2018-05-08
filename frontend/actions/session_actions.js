import * as SessionApiUtil from "../util/session_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

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

const receiveSessionErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  };
};

export const signup = (user) => {
  return (dispatch) => {
    return SessionApiUtil.signup(user).then(
      (user) => { return dispatch(receiveUser(user)) },
      (errors) => { return dispatch(receiveSessionErrors(errors)) }
    );
  };
};

export const login = (user) => {
  return (dispatch) => {
    return SessionApiUtil.login(user).then(
      (user) => { return dispatch(receiveUser(user)) },
      (errors) => { return dispatch(receiveSessionErrors(errors)) }
    );
  };
};

export const logout = () => {
  return (dispatch) => {
    return SessionApiUtil.logout().then(
      () => { return dispatch(logoutUser()) },
      (errors) => { return dispatch(receiveSessionErrors(errors)) }
    );
  };
};
