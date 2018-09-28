import axios from "../../axios-allcal-staging-api";
import * as actionTypes from "./actionTypes";

export const appLogin = loginToken => {
  return dispatch => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("loginToken");
    dispatch(authStart());
    axios
      .get("/account", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("loginToken", loginToken);
        dispatch(
          authSuccess(response.data.userId, response.data.name, loginToken)
        );
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (userId, userName, loginToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    userName: userName,
    loginToken: loginToken
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message
  };
};

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("loginToken");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthState = urlToken => {
  return dispatch => {
    if (urlToken) dispatch(appLogin(urlToken));
    else if (localStorage.getItem("loginToken"))
      dispatch(
        authSuccess(
          localStorage.getItem("userId"),
          localStorage.getItem("userName"),
          localStorage.getItem("loginToken")
        )
      );
  };
};
