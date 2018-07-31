import * as actionTypes from "../actions/actionTypes";

const initialState = {
  holesArray: [
    { id: 1, value: "", par: 3 },
    { id: 2, value: "", par: 3 },
    { id: 3, value: "", par: 3 },
    { id: 4, value: "", par: 3 },
    { id: 5, value: "", par: 3 },
    { id: 6, value: "", par: 3 },
    { id: 7, value: "", par: 3 },
    { id: 8, value: "", par: 3 },
    { id: 9, value: "", par: 3 },
    { id: 10, value: "", par: 3 },
    { id: 11, value: "", par: 3 },
    { id: 12, value: "", par: 3 },
    { id: 13, value: "", par: 3 },
    { id: 14, value: "", par: 3 },
    { id: 15, value: "", par: 3 },
    { id: 16, value: "", par: 3 },
    { id: 17, value: "", par: 3 },
    { id: 18, value: "", par: 3 }
  ],
  total1: "",
  total2: "",
  total: ""
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

    default:
      return state;
  }
};

export default reducer;
