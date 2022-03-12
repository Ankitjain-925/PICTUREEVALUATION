import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
} from "../actiontypes";

import { CometChat } from "@cometchat-pro/chat";

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: AUTH_SUCCESS,
    user: user,
    isLoggedIn: true,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logoutSuccess = () => {
  return {
    type: AUTH_LOGOUT,
    authRedirectPath: "/login",
  };
};

export const logout = () => {
  return (dispatch) => {
    CometChat.logout().then(dispatch(logoutSuccess()));
  };
};

export const auth = (uid, authKey) => {
  return (dispatch) => {
    dispatch(authStart());

    CometChat.login(uid, authKey)
      .then((user) => {
        if (user) {
          dispatch(authSuccess(user));
        } else {
          dispatch(authFail(user));
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    CometChat.getLoggedinUser()
      .then((user) => {
        if (user) {
          dispatch(authSuccess(user));
        } else {
          dispatch(authFail(user));
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
