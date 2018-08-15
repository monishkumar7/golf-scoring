import * as actionTypes from "../actions/actionTypes";

const initialState = {
  holesArray: [
    { id: 1, value: 3, par: 3, difficulty: 4, touched: false },
    { id: 2, value: 3, par: 3, difficulty: 7, touched: false },
    { id: 3, value: 3, par: 3, difficulty: 18, touched: false },
    { id: 4, value: 3, par: 3, difficulty: 15, touched: false },
    { id: 5, value: 3, par: 3, difficulty: 11, touched: false },
    { id: 6, value: 3, par: 3, difficulty: 2, touched: false },
    { id: 7, value: 3, par: 3, difficulty: 3, touched: false },
    { id: 8, value: 3, par: 3, difficulty: 9, touched: false },
    { id: 9, value: 3, par: 3, difficulty: 10, touched: false },
    { id: 10, value: 3, par: 3, difficulty: 17, touched: false },
    { id: 11, value: 3, par: 3, difficulty: 12, touched: false },
    { id: 12, value: 3, par: 3, difficulty: 16, touched: false },
    { id: 13, value: 3, par: 3, difficulty: 8, touched: false },
    { id: 14, value: 3, par: 3, difficulty: 1, touched: false },
    { id: 15, value: 3, par: 3, difficulty: 5, touched: false },
    { id: 16, value: 3, par: 3, difficulty: 13, touched: false },
    { id: 17, value: 3, par: 3, difficulty: 6, touched: false },
    { id: 18, value: 3, par: 3, difficulty: 1, touched: false }
  ],
  total1: "",
  total2: "",
  total: "",
  eventId: null,
  submitted: false
};

const fetchSuccess = (state, action) => {
  const holeScores = action.holeScores;
  let updatedHolesArray = [...state.holesArray];
  let updatedTotal11 = 0;
  let updatedTotal21 = 0;
  let updatedTotal22 = 0;
  for (let holeScore of holeScores) {
    if (holeScore.score) {
      updatedHolesArray[holeScore.holeNumber - 1].value = holeScore.score;
      if (holeScore.holeNumber <= 9) {
        updatedTotal11 += +holeScore.score;
      } else {
        updatedTotal21 += +holeScore.score;
      }
      updatedTotal22 += +holeScore.score;
    }
  }
  return {
    ...state,
    holesArray: updatedHolesArray,
    total1: updatedTotal11,
    total2: updatedTotal21,
    total: updatedTotal22
  };
};

const inputChange = (state, action) => {
  let updatedTotal1 = state.total1;
  let updatedTotal2 = state.total2;
  let updatedTotal = state.total;
  if (state.holesArray[action.holeId - 1].touched) {
    if (action.holeId < 10) {
      updatedTotal1 =
        +updatedTotal1 +
        +action.newScore -
        +state.holesArray[action.holeId - 1].value;
    } else if (action.holeId > 9) {
      updatedTotal2 =
        +updatedTotal2 +
        +action.newScore -
        +state.holesArray[action.holeId - 1].value;
    }
    updatedTotal =
      +updatedTotal +
      +action.newScore -
      +state.holesArray[action.holeId - 1].value;
  } else {
    if (action.holeId < 10) {
      updatedTotal1 = +updatedTotal1 + +action.newScore;
    } else if (action.holeId > 9) {
      updatedTotal2 = +updatedTotal2 + +action.newScore;
    }
    updatedTotal = +updatedTotal + +action.newScore;
  }
  return {
    ...state,
    holesArray: state.holesArray.map((arrayItem, index) => {
      if (index + 1 !== action.holeId) {
        return arrayItem;
      }

      return {
        ...arrayItem,
        value: action.newScore,
        touched: true
      };
    }),
    total1: updatedTotal1,
    total2: updatedTotal2,
    total: updatedTotal
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_EVENTID:
      return {
        ...state,
        eventId: action.eventId
      };

    case actionTypes.FETCH_SUCCESS:
      return fetchSuccess(state, action);

    case actionTypes.INPUT_CHANGE:
      return inputChange(state, action);

    case actionTypes.RESET_SCORE:
      return initialState;

    case actionTypes.SUBMIT_SUCCESS:
      return {
        ...state,
        submitted: true
      };

    case actionTypes.SUBMIT_FAIL:
      return {
        ...state,
        submitted: false
      };

    default:
      return state;
  }
};

export default reducer;
