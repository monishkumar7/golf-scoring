import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  userName: null,
  error: null,
  loading: false,
  isLoggedIn: false,
  appMode: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        isLoggedIn: true,
        userName: action.userName
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
