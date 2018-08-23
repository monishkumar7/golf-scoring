import * as actionTypes from "../actions/actionTypes";

const initialState = {
  holesArray: [
    { id: 1, value: "", par: 4, difficulty: 4, touched: false },
    { id: 2, value: "", par: 4, difficulty: 7, touched: false },
    { id: 3, value: "", par: 3, difficulty: 18, touched: false },
    { id: 4, value: "", par: 4, difficulty: 15, touched: false },
    { id: 5, value: "", par: 4, difficulty: 11, touched: false },
    { id: 6, value: "", par: 4, difficulty: 2, touched: false },
    { id: 7, value: "", par: 3, difficulty: 3, touched: false },
    { id: 8, value: "", par: 5, difficulty: 9, touched: false },
    { id: 9, value: "", par: 4, difficulty: 10, touched: false },
    { id: 10, value: "", par: 4, difficulty: 17, touched: false },
    { id: 11, value: "", par: 5, difficulty: 12, touched: false },
    { id: 12, value: "", par: 4, difficulty: 16, touched: false },
    { id: 13, value: "", par: 3, difficulty: 8, touched: false },
    { id: 14, value: "", par: 4, difficulty: 1, touched: false },
    { id: 15, value: "", par: 4, difficulty: 5, touched: false },
    { id: 16, value: "", par: 4, difficulty: 13, touched: false },
    { id: 17, value: "", par: 5, difficulty: 6, touched: false },
    { id: 18, value: "", par: 4, difficulty: 1, touched: false }
  ],
  total1: "",
  total2: "",
  total: "",
  eventId: null,
  submitted: false,
  previousGames: [
    {
      holesArray: [
        { id: 1, value: 3, par: 4, difficulty: 4, touched: true },
        { id: 2, value: 4, par: 4, difficulty: 7, touched: true },
        { id: 3, value: 5, par: 3, difficulty: 18, touched: true },
        { id: 4, value: 6, par: 4, difficulty: 15, touched: true },
        { id: 5, value: 7, par: 4, difficulty: 11, touched: true },
        { id: 6, value: 8, par: 4, difficulty: 2, touched: true },
        { id: 7, value: 3, par: 3, difficulty: 3, touched: true },
        { id: 8, value: 2, par: 5, difficulty: 9, touched: true },
        { id: 9, value: 5, par: 4, difficulty: 10, touched: true },
        { id: 10, value: 7, par: 4, difficulty: 17, touched: true },
        { id: 11, value: 8, par: 5, difficulty: 12, touched: true },
        { id: 12, value: 9, par: 4, difficulty: 16, touched: true },
        { id: 13, value: 3, par: 3, difficulty: 8, touched: true },
        { id: 14, value: 4, par: 4, difficulty: 1, touched: true },
        { id: 15, value: 6, par: 4, difficulty: 5, touched: true },
        { id: 16, value: 7, par: 4, difficulty: 13, touched: true },
        { id: 17, value: 2, par: 5, difficulty: 6, touched: true },
        { id: 18, value: 4, par: 4, difficulty: 1, touched: true }
      ],
      total1: 40,
      total2: 36,
      total: 76,
      eventId: "1",
      submitted: false
    },
    {
      holesArray: [
        { id: 1, value: 3, par: 4, difficulty: 4, touched: true },
        { id: 2, value: 4, par: 4, difficulty: 7, touched: true },
        { id: 3, value: 5, par: 3, difficulty: 18, touched: true },
        { id: 4, value: 6, par: 4, difficulty: 15, touched: true },
        { id: 5, value: 7, par: 4, difficulty: 11, touched: true },
        { id: 6, value: 8, par: 4, difficulty: 2, touched: true },
        { id: 7, value: 3, par: 3, difficulty: 3, touched: true },
        { id: 8, value: 2, par: 5, difficulty: 9, touched: true },
        { id: 9, value: 5, par: 4, difficulty: 10, touched: true },
        { id: 10, value: 7, par: 4, difficulty: 17, touched: true },
        { id: 11, value: 8, par: 5, difficulty: 12, touched: true },
        { id: 12, value: 9, par: 4, difficulty: 16, touched: true },
        { id: 13, value: 3, par: 3, difficulty: 8, touched: true },
        { id: 14, value: 4, par: 4, difficulty: 1, touched: true },
        { id: 15, value: 6, par: 4, difficulty: 5, touched: true },
        { id: 16, value: 7, par: 4, difficulty: 13, touched: true },
        { id: 17, value: 2, par: 5, difficulty: 6, touched: true },
        { id: 18, value: 4, par: 4, difficulty: 1, touched: true }
      ],
      total1: 40,
      total2: 36,
      total: 76,
      eventId: "2",
      submitted: false
    },
    {
      holesArray: [
        { id: 1, value: 3, par: 4, difficulty: 4, touched: true },
        { id: 2, value: 4, par: 4, difficulty: 7, touched: true },
        { id: 3, value: 5, par: 3, difficulty: 18, touched: true },
        { id: 4, value: 6, par: 4, difficulty: 15, touched: true },
        { id: 5, value: 7, par: 4, difficulty: 11, touched: true },
        { id: 6, value: 8, par: 4, difficulty: 2, touched: true },
        { id: 7, value: 3, par: 3, difficulty: 3, touched: true },
        { id: 8, value: 2, par: 5, difficulty: 9, touched: true },
        { id: 9, value: 5, par: 4, difficulty: 10, touched: true },
        { id: 10, value: 7, par: 4, difficulty: 17, touched: true },
        { id: 11, value: 8, par: 5, difficulty: 12, touched: true },
        { id: 12, value: 9, par: 4, difficulty: 16, touched: true },
        { id: 13, value: 3, par: 3, difficulty: 8, touched: true },
        { id: 14, value: 4, par: 4, difficulty: 1, touched: true },
        { id: 15, value: 6, par: 4, difficulty: 5, touched: true },
        { id: 16, value: 7, par: 4, difficulty: 13, touched: true },
        { id: 17, value: 2, par: 5, difficulty: 6, touched: true },
        { id: 18, value: 4, par: 4, difficulty: 1, touched: true }
      ],
      total1: 40,
      total2: 36,
      total: 76,
      eventId: "3",
      submitted: false
    },
    {
      holesArray: [
        { id: 1, value: 3, par: 4, difficulty: 4, touched: true },
        { id: 2, value: 4, par: 4, difficulty: 7, touched: true },
        { id: 3, value: 5, par: 3, difficulty: 18, touched: true },
        { id: 4, value: 6, par: 4, difficulty: 15, touched: true },
        { id: 5, value: 7, par: 4, difficulty: 11, touched: true },
        { id: 6, value: 8, par: 4, difficulty: 2, touched: true },
        { id: 7, value: 3, par: 3, difficulty: 3, touched: true },
        { id: 8, value: 2, par: 5, difficulty: 9, touched: true },
        { id: 9, value: 5, par: 4, difficulty: 10, touched: true },
        { id: 10, value: 7, par: 4, difficulty: 17, touched: true },
        { id: 11, value: 8, par: 5, difficulty: 12, touched: true },
        { id: 12, value: 9, par: 4, difficulty: 16, touched: true },
        { id: 13, value: 3, par: 3, difficulty: 8, touched: true },
        { id: 14, value: 4, par: 4, difficulty: 1, touched: true },
        { id: 15, value: 6, par: 4, difficulty: 5, touched: true },
        { id: 16, value: 7, par: 4, difficulty: 13, touched: true },
        { id: 17, value: 2, par: 5, difficulty: 6, touched: true },
        { id: 18, value: 4, par: 4, difficulty: 1, touched: true }
      ],
      total1: 40,
      total2: 36,
      total: 76,
      eventId: "4",
      submitted: false
    }
  ]
};

const fetchScoresSuccess = (state, action) => {
  const holeScores = action.holeScores;
  let updatedHolesArray = [...state.holesArray];
  let updatedTotal11 = 0;
  let updatedTotal21 = 0;
  let updatedTotal22 = 0;
  for (let holeScore of holeScores) {
    if (holeScore.score) {
      updatedHolesArray[holeScore.holeNumber - 1].value = holeScore.score;
      updatedHolesArray[holeScore.holeNumber - 1].touched = true;
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

const scoreUpdate = (state, action) => {
  let updatedTotal1 = state.total1;
  let updatedTotal2 = state.total2;
  let updatedTotal = state.total;
  if (state.holesArray[action.holeNumber - 1].touched) {
    if (action.holeNumber < 10) {
      updatedTotal1 =
        +updatedTotal1 +
        +action.holeScore -
        +state.holesArray[action.holeNumber - 1].value;
    } else if (action.holeNumber > 9) {
      updatedTotal2 =
        +updatedTotal2 +
        +action.holeScore -
        +state.holesArray[action.holeNumber - 1].value;
    }
    updatedTotal =
      +updatedTotal +
      +action.holeScore -
      +state.holesArray[action.holeNumber - 1].value;
  } else {
    if (action.holeNumber < 10) {
      updatedTotal1 = +updatedTotal1 + +action.holeScore;
    } else if (action.holeNumber > 9) {
      updatedTotal2 = +updatedTotal2 + +action.holeScore;
    }
    updatedTotal = +updatedTotal + +action.holeScore;
  }
  return {
    ...state,
    holesArray: state.holesArray.map((arrayItem, index) => {
      if (index + 1 !== action.holeNumber) {
        return arrayItem;
      }

      return {
        ...arrayItem,
        value: action.holeScore,
        touched: action.touched
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

    case actionTypes.FETCH_SCORES_SUCCESS:
      return fetchScoresSuccess(state, action);

    case actionTypes.SCORE_UPDATE_SUCCESS:
      return scoreUpdate(state, action);

    case actionTypes.RESET_SCORE_SUCCESS:
      return {
        ...state,
        holesArray: [
          { id: 1, value: "", par: 4, difficulty: 4, touched: false },
          { id: 2, value: "", par: 4, difficulty: 7, touched: false },
          { id: 3, value: "", par: 3, difficulty: 18, touched: false },
          { id: 4, value: "", par: 4, difficulty: 15, touched: false },
          { id: 5, value: "", par: 4, difficulty: 11, touched: false },
          { id: 6, value: "", par: 4, difficulty: 2, touched: false },
          { id: 7, value: "", par: 3, difficulty: 3, touched: false },
          { id: 8, value: "", par: 5, difficulty: 9, touched: false },
          { id: 9, value: "", par: 4, difficulty: 10, touched: false },
          { id: 10, value: "", par: 4, difficulty: 17, touched: false },
          { id: 11, value: "", par: 5, difficulty: 12, touched: false },
          { id: 12, value: "", par: 4, difficulty: 16, touched: false },
          { id: 13, value: "", par: 3, difficulty: 8, touched: false },
          { id: 14, value: "", par: 4, difficulty: 1, touched: false },
          { id: 15, value: "", par: 4, difficulty: 5, touched: false },
          { id: 16, value: "", par: 4, difficulty: 13, touched: false },
          { id: 17, value: "", par: 5, difficulty: 6, touched: false },
          { id: 18, value: "", par: 4, difficulty: 1, touched: false }
        ],
        total1: "",
        total2: "",
        total: "",
        submitted: false
      };

    default:
      return state;
  }
};

export default reducer;
