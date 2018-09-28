import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  userName: null,
  error: null,
  loginToken: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        userName: action.userName,
        loginToken: action.loginToken,
        loading: false
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case actionTypes.AUTH_LOGOUT:
      return state;

    default:
      return state;
  }
};

export default reducer;
