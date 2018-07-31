import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  error: null,
  loading: false,
  authenticated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        authenticated: true
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        authenticated: false
      };
    default:
      return state;
  }
};

export default reducer;
