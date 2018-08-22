import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  userName: null,
  error: null,
  loginToken: null,
  loading: false,
  auth: false,
  appMode: false,
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        userName: action.userName,
        loginToken: action.loginToken,
        appMode: action.appMode,
        auth: true
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        auth: false,
        error: action.error
      };

    case actionTypes.AUTH_START:
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
};

export default reducer;
