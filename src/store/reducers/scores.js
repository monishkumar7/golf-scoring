import * as actionTypes from "../actions/actionTypes";

const emptyHolesArray = [
  {
    number: 1,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 2,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 3,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 4,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 5,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 6,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 7,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 8,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 9,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 10,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 11,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 12,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 13,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 14,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 15,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 16,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 17,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  },
  {
    number: 18,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false
  }
];

const initialState = {
  previousScorecards: [],
  currentScorecard: {
    scorecardId: "",
    holesArray: emptyHolesArray,
    total1: "",
    total2: "",
    total: "",
    isComplete: false
  },
  loading: false,
  redirectPath: ""
};

const fetchAllScorecardsSuccess = (state, action) => {
  const scoreCards = action.scoreCards;
  let scorecardsArray = [];
  let currentScorecardId = null;
  scoreCards.forEach(scorecard => {
    if (scorecard.isComplete)
      scorecardsArray.push({
        scorecardId: scorecard._id,
        lastUpdatedTime: Date.parse(scorecard.lastUpdatedTime)
      });
    else currentScorecardId = scorecard._id;
  });
  return {
    currentScorecard: {
      ...state.currentScorecard,
      scorecardId: currentScorecardId
    },
    previousScorecards: scorecardsArray,
    loading: false,
    redirectPath: ""
  };
};

const fetchScorecardSuccess = (state, action) => {
  const holeScores = action.holeScores;
  const fetchedScorecardId = action.holeScores[0].linkedScoreCardId;
  let updatedHolesArray = emptyHolesArray.map(emptyHole => ({ ...emptyHole }));
  let updatedTotal11 = 0;
  let updatedTotal21 = 0;
  let updatedTotal22 = 0;
  let updatedLastUpdatedTime = new Date("January 1 2018");
  for (let holeScore of holeScores) {
    if (holeScore.score) {
      updatedHolesArray[holeScore.holeNumber - 1].score = holeScore.score;
      updatedHolesArray[holeScore.holeNumber - 1].touched = true;
      if (holeScore.holeNumber <= 9) {
        updatedTotal11 += +holeScore.score;
      } else {
        updatedTotal21 += +holeScore.score;
      }
      updatedTotal22 += +holeScore.score;
      updatedLastUpdatedTime =
        updatedLastUpdatedTime > holeScore.lastUpdatedTime
          ? updatedLastUpdatedTime
          : holeScore.lastUpdatedTime;
    }
  }
  const fetchedScorecard = {
    scorecardId: fetchedScorecardId,
    holesArray: updatedHolesArray,
    total1: updatedTotal11,
    total2: updatedTotal21,
    total: updatedTotal22,
    isComplete: action.isComplete,
    lastUpdatedTime: updatedLastUpdatedTime
  };
  let updatedPrevScorecards = state.previousScorecards.filter(
    prev => prev.scorecardId !== fetchedScorecardId
  );
  updatedPrevScorecards = updatedPrevScorecards.concat(fetchedScorecard);
  updatedPrevScorecards.sort(function(a, b) {
    return a.lastUpdatedTime > b.lastUpdatedTime
      ? 1
      : b.lastUpdatedTime > a.lastUpdatedTime
        ? -1
        : 0;
  });
  if (action.isComplete) {
    return {
      ...state,
      previousScorecards: updatedPrevScorecards,
      loading: false
    };
  } else {
    return {
      ...state,
      currentScorecard: fetchedScorecard,
      loading: false
    };
  }
};

const updateScoreSuccess = (state, action) => {
  let updatedTotal1 = state.currentScorecard.total1;
  let updatedTotal2 = state.currentScorecard.total2;
  let updatedTotal = state.currentScorecard.total;
  if (state.currentScorecard.holesArray[action.holeNumber - 1].touched) {
    if (action.holeNumber < 10) {
      updatedTotal1 =
        +updatedTotal1 +
        +action.holeScore -
        +state.currentScorecard.holesArray[action.holeNumber - 1].score;
    } else if (action.holeNumber > 9) {
      updatedTotal2 =
        +updatedTotal2 +
        +action.holeScore -
        +state.currentScorecard.holesArray[action.holeNumber - 1].score;
    }
    updatedTotal =
      +updatedTotal +
      +action.holeScore -
      +state.currentScorecard.holesArray[action.holeNumber - 1].score;
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
    currentScorecard: {
      ...state.currentScorecard,
      holesArray: state.currentScorecard.holesArray.map((arrayItem, index) => {
        if (index + 1 !== action.holeNumber) {
          return arrayItem;
        }

        return {
          ...arrayItem,
          score: action.holeScore,
          touched: action.touched
        };
      }),
      total1: updatedTotal1,
      total2: updatedTotal2,
      total: updatedTotal
    },
    loading: false
  };
};

const createScorecard = (state, action) => {
  return {
    ...state,
    currentScorecard: {
      scorecardId: action.scorecardId,
      holesArray: emptyHolesArray.map(emptyHole => ({ ...emptyHole })),
      total1: "",
      total2: "",
      total: "",
      isComplete: false
    },
    loading: false
  };
};

const submitScorecardSuccess = (state, action) => {
  return {
    ...state,
    currentScorecard: {
      scorecardId: "",
      holesArray: emptyHolesArray.map(emptyHole => ({ ...emptyHole })),
      total1: "",
      total2: "",
      total: "",
      isComplete: false
    },
    loading: false,
    redirectPath: "/home"
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SCORECARD_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.CREATE_SCORECARD_SUCCESS:
      return createScorecard(state, action);

    case actionTypes.CREATE_SCORECARD_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_ALL_SCORECARDS_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_ALL_SCORECARDS_SUCCESS:
      return fetchAllScorecardsSuccess(state, action);

    case actionTypes.FETCH_ALL_SCORECARDS_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_SCORECARD_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_SCORECARD_SUCCESS:
      return fetchScorecardSuccess(state, action);

    case actionTypes.FETCH_SCORECARD_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.UPDATE_SCORE_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.UPDATE_SCORE_SUCCESS:
      return updateScoreSuccess(state, action);

    case actionTypes.UPDATE_SCORE_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.RESET_SCORECARD_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.RESET_SCORECARD_SUCCESS:
      return {
        ...state,
        currentScorecard: {
          ...state.currentScorecard,
          holesArray: emptyHolesArray.map(emptyHole => ({ ...emptyHole })),
          total1: "",
          total2: "",
          total: "",
          isComplete: false
        },
        loading: false
      };

    case actionTypes.RESET_SCORECARD_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.SUBMIT_SCORECARD_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.SUBMIT_SCORECARD_SUCCESS:
      return submitScorecardSuccess(state, action);

    case actionTypes.SUBMIT_SCORECARD_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
