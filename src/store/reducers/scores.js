import * as actionTypes from "../actions/actionTypes";

const emptyHolesArray = [
  {
    number: 1,
    score: "",
    par: 4,
    difficulty: 17,
    touched: false,
    latitude: 43.562423,
    longitude: -83.423522,
    distance: ""
  },
  {
    number: 2,
    score: "",
    par: 4,
    difficulty: 13,
    touched: false,
    latitude: 42.562423,
    longitude: -83.523522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 3,
    score: "",
    par: 3,
    difficulty: 15,
    touched: false,
    latitude: 44.562423,
    longitude: -83.323522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 4,
    score: "",
    par: 4,
    difficulty: 5,
    touched: false,
    latitude: 42.162423,
    longitude: -83.123522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 5,
    score: "",
    par: 4,
    difficulty: 3,
    touched: false,
    latitude: 42.262423,
    longitude: -83.223522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 6,
    score: "",
    par: 4,
    difficulty: 1,
    touched: false,
    latitude: 42.362423,
    longitude: -83.323522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 7,
    score: "",
    par: 3,
    difficulty: 11,
    touched: false,
    latitude: 42.462423,
    longitude: -83.423522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 8,
    score: "",
    par: 5,
    difficulty: 7,
    touched: false,
    latitude: 42.662423,
    longitude: -83.623522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 9,
    score: "",
    par: 4,
    difficulty: 9,
    touched: false,
    latitude: 42.762423,
    longitude: -83.723522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 10,
    score: "",
    par: 4,
    difficulty: 14,
    touched: false,
    latitude: 42.862423,
    longitude: -83.823522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 11,
    score: "",
    par: 5,
    difficulty: 6,
    touched: false,
    latitude: 42.962423,
    longitude: -83.923522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 12,
    score: "",
    par: 4,
    difficulty: 8,
    touched: false,
    latitude: 42.962423,
    longitude: -83.123522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 13,
    score: "",
    par: 3,
    difficulty: 18,
    touched: false,
    latitude: 42.862423,
    longitude: -83.223522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 14,
    score: "",
    par: 4,
    difficulty: 10,
    touched: false,
    latitude: 42.762423,
    longitude: -83.323522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 15,
    score: "",
    par: 4,
    difficulty: 4,
    touched: false,
    latitude: 42.662423,
    longitude: -83.423522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 16,
    score: "",
    par: 4,
    difficulty: 2,
    touched: false,
    latitude: 42.462423,
    longitude: -83.623522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 17,
    score: "",
    par: 5,
    difficulty: 16,
    touched: false,
    latitude: 42.262423,
    longitude: -83.823522,
    distance: "",
    locationAccuracy: ""
  },
  {
    number: 18,
    score: "",
    par: 4,
    difficulty: 12,
    touched: false,
    latitude: 42.362423,
    longitude: -83.723522,
    distance: "",
    locationAccuracy: ""
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

const fetchAllScorecards = (state, action) => {
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

const fetchCurrentScorecard = (state, action) => {
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
    isComplete: false,
    lastUpdatedTime: updatedLastUpdatedTime
  };
  return {
    ...state,
    currentScorecard: fetchedScorecard,
    loading: false
  };
};

const fetchPreviousScorecards = (state, action) => {
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
    return a.lastUpdatedTime < b.lastUpdatedTime
      ? 1
      : b.lastUpdatedTime < a.lastUpdatedTime
        ? -1
        : 0;
  });
  return {
    ...state,
    previousScorecards: updatedPrevScorecards,
    loading: false
  };
};

const updateScore = (state, action) => {
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
    }
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

const submitScorecard = (state, action) => {
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

const updateDistance = (state, action) => {
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
          distance: action.holeDistance,
          locationAccuracy: action.locationAccuracy
        };
      })
    }
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
      return fetchAllScorecards(state, action);

    case actionTypes.FETCH_ALL_SCORECARDS_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_CURRENT_SCORECARD_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_CURRENT_SCORECARD_SUCCESS:
      return fetchCurrentScorecard(state, action);

    case actionTypes.FETCH_CURRENT_SCORECARD_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_PREVIOUS_SCORECARDS_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_PREVIOUS_SCORECARDS_SUCCESS:
      return fetchPreviousScorecards(state, action);

    case actionTypes.FETCH_PREVIOUS_SCORECARDS_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.UPDATE_SCORE_START:
      return {
        ...state
      };

    case actionTypes.UPDATE_SCORE_SUCCESS:
      return updateScore(state, action);

    case actionTypes.UPDATE_SCORE_FAIL:
      return {
        ...state
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
      return submitScorecard(state, action);

    case actionTypes.SUBMIT_SCORECARD_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.UPDATE_DISTANCE:
      return updateDistance(state, action);

    default:
      return state;
  }
};

export default reducer;
