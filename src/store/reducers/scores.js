import * as actionTypes from "../actions/actionTypes";

const initialState = {
  holesArray: [
    { id: 1, value: "", par: 3, difficulty: 4 },
    { id: 2, value: "", par: 3, difficulty: 7 },
    { id: 3, value: "", par: 3, difficulty: 18 },
    { id: 4, value: "", par: 3, difficulty: 15 },
    { id: 5, value: "", par: 3, difficulty: 11 },
    { id: 6, value: "", par: 3, difficulty: 2 },
    { id: 7, value: "", par: 3, difficulty: 3 },
    { id: 8, value: "", par: 3, difficulty: 9 },
    { id: 9, value: "", par: 3, difficulty: 10 },
    { id: 10, value: "", par: 3, difficulty: 17 },
    { id: 11, value: "", par: 3, difficulty: 12 },
    { id: 12, value: "", par: 3, difficulty: 16 },
    { id: 13, value: "", par: 3, difficulty: 8 },
    { id: 14, value: "", par: 3, difficulty: 1 },
    { id: 15, value: "", par: 3, difficulty: 5 },
    { id: 16, value: "", par: 3, difficulty: 13 },
    { id: 17, value: "", par: 3, difficulty: 6 },
    { id: 18, value: "", par: 3, difficulty: 14 }
  ],
  total1: "",
  total2: "",
  total: "",
  submitted: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INPUT_CHANGE:
      let updatedTotal1 = state.total1;
      let updatedTotal2 = state.total2;
      let updatedTotal = state.total;
      if (action.newScore !== "") {
        if (action.holeId < 10) {
          updatedTotal1 =
            updatedTotal1 +
            parseFloat(action.newScore) -
            state.holesArray[action.holeId - 1].value;
        } else if (action.holeId > 9) {
          updatedTotal2 =
            updatedTotal2 +
            parseFloat(action.newScore) -
            state.holesArray[action.holeId - 1].value;
        }
        updatedTotal =
          updatedTotal +
          parseFloat(action.newScore) -
          state.holesArray[action.holeId - 1].value;
      } else {
        if (action.holeId < 10) {
          updatedTotal1 =
            updatedTotal1 - state.holesArray[action.holeId - 1].value;
        } else if (action.holeId > 9) {
          updatedTotal2 =
            updatedTotal2 - state.holesArray[action.holeId - 1].value;
        }
        updatedTotal = updatedTotal - state.holesArray[action.holeId - 1].value;
      }
      return {
        holesArray: state.holesArray.map((arrayItem, index) => {
          if (index + 1 !== action.holeId) {
            return arrayItem;
          }

          return {
            ...arrayItem,
            value: action.newScore
          };
        }),
        total1: updatedTotal1,
        total2: updatedTotal2,
        total: updatedTotal
      };

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
