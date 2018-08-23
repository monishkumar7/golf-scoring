import axios from "../../axios-allcal-staging-api";
import * as actionTypes from "./actionTypes";

export const webLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const data = {
      email: email,
      password: password
    };
    axios
      .post("/auth/login", data)
      .then(response => {
        dispatch(
          authSuccess(
            response.data.userId,
            response.data.name,
            response.data.loginToken,
            false
          )
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

export const appLogin = loginToken => {
  return dispatch => {
    dispatch(authStart());
    axios
      .get("/account", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(
          authSuccess(
            response.data.userId,
            response.data.name,
            loginToken,
            true
          )
        );
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

export const authSuccess = (userId, userName, loginToken, appMode) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    userName: userName,
    loginToken: loginToken,
    appMode: appMode
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message
  };
};
