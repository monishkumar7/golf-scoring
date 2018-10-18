import * as actionTypes from '../actions/actionTypes';

const emptyHolesArray = [
  {
    number: 1,
    score: '',
    par: 4,
    difficulty: 17,
    touched: false,
    yards: 250,
    latitude: 43.562423,
    longitude: -83.423522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 2,
    score: '',
    par: 4,
    difficulty: 13,
    touched: false,
    yards: 390,
    latitude: 42.562423,
    longitude: -83.523522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 3,
    score: '',
    par: 3,
    difficulty: 15,
    touched: false,
    yards: 220,
    latitude: 44.562423,
    longitude: -83.323522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 4,
    score: '',
    par: 4,
    difficulty: 5,
    touched: false,
    yards: 250,
    latitude: 42.162423,
    longitude: -83.123522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 5,
    score: '',
    par: 4,
    difficulty: 3,
    touched: false,
    yards: 360,
    latitude: 42.262423,
    longitude: -83.223522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 6,
    score: '',
    par: 4,
    difficulty: 1,
    touched: false,
    yards: 340,
    latitude: 42.362423,
    longitude: -83.323522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 7,
    score: '',
    par: 3,
    difficulty: 11,
    touched: false,
    yards: 280,
    latitude: 42.462423,
    longitude: -83.423522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 8,
    score: '',
    par: 5,
    difficulty: 7,
    touched: false,
    yards: 291,
    latitude: 42.662423,
    longitude: -83.623522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 9,
    score: '',
    par: 4,
    difficulty: 9,
    touched: false,
    yards: 311,
    latitude: 42.762423,
    longitude: -83.723522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 10,
    score: '',
    par: 4,
    difficulty: 14,
    touched: false,
    yards: 402,
    latitude: 42.862423,
    longitude: -83.823522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 11,
    score: '',
    par: 5,
    difficulty: 6,
    touched: false,
    yards: 210,
    latitude: 42.962423,
    longitude: -83.923522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 12,
    score: '',
    par: 4,
    difficulty: 8,
    touched: false,
    yards: 387,
    latitude: 42.962423,
    longitude: -83.123522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 13,
    score: '',
    par: 3,
    difficulty: 18,
    touched: false,
    yards: 270,
    latitude: 42.862423,
    longitude: -83.223522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 14,
    score: '',
    par: 4,
    difficulty: 10,
    touched: false,
    yards: 422,
    latitude: 42.762423,
    longitude: -83.323522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 15,
    score: '',
    par: 4,
    difficulty: 4,
    touched: false,
    yards: 380,
    latitude: 42.662423,
    longitude: -83.423522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 16,
    score: '',
    par: 4,
    difficulty: 2,
    touched: false,
    yards: 230,
    latitude: 42.462423,
    longitude: -83.623522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 17,
    score: '',
    par: 5,
    difficulty: 16,
    touched: false,
    yards: 280,
    latitude: 42.262423,
    longitude: -83.823522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  },
  {
    number: 18,
    score: '',
    par: 4,
    difficulty: 12,
    touched: false,
    yards: 280,
    latitude: 42.362423,
    longitude: -83.723522,
    distance: '',
    locationAccuracy: '',
    isFetchingLocation: false,
    isLoading: false
  }
];

const initialState = {
  previousScorecards: [],
  currentScorecard: {
    scorecardId: '',
    holesArray: emptyHolesArray,
    total1: '',
    total2: '',
    total: '',
    isComplete: false
  },
  loading: false,
  redirectPath: ''
};

const fetchAllScorecards = (state, action) => {
  const scoreCards = action.scoreCards;
  let scorecardsArray = [];
  let currentScorecardId = null;
  scoreCards.forEach(scorecard => {
    if (scorecard.isComplete)
      scorecardsArray.unshift({
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
    redirectPath: ''
  };
};

const fetchCurrentScorecard = (state, action) => {
  const holeScores = action.holeScores;
  const fetchedScorecardId = action.holeScores[0].linkedScoreCardId;
  let updatedHolesArray = emptyHolesArray.map(emptyHole => ({ ...emptyHole }));
  let updatedTotal11 = 0;
  let updatedTotal21 = 0;
  let updatedTotal22 = 0;
  let updatedLastUpdatedTime = new Date('January 1 2018');
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

const fetchPreviousScorecardStart = (state, action) => {
  let updatedPrevScorecards = state.previousScorecards.slice();
  updatedPrevScorecards.forEach(prevScorecard => {
    if (prevScorecard.scorecardId === action.scorecardId) {
      prevScorecard.isLoading = true;
    }
  });
  return {
    ...state,
    previousScorecards: updatedPrevScorecards
  };
};

const fetchPreviousScorecard = (state, action) => {
  const holeScores = action.holeScores;
  const fetchedScorecardId = action.holeScores[0].linkedScoreCardId;
  let updatedHolesArray = emptyHolesArray.map(emptyHole => ({ ...emptyHole }));
  let updatedTotal11 = 0;
  let updatedTotal21 = 0;
  let updatedTotal22 = 0;
  let updatedLastUpdatedTime = new Date('January 1 2018');
  let updatedPrevScorecards = state.previousScorecards.slice();
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
  updatedPrevScorecards.forEach(prevScorecard => {
    if (prevScorecard.scorecardId === fetchedScorecardId) {
      prevScorecard.holesArray = updatedHolesArray;
      prevScorecard.total1 = updatedTotal11;
      prevScorecard.total2 = updatedTotal21;
      prevScorecard.total = updatedTotal22;
      prevScorecard.isComplete = true;
      prevScorecard.lastUpdatedTime = updatedLastUpdatedTime;
      prevScorecard.isLoading = false;
    }
  });
  return {
    ...state,
    previousScorecards: updatedPrevScorecards
  };
};

const fetchPreviousScorecardFail = (state, action) => {
  let updatedPrevScorecards = state.previousScorecards.slice();
  updatedPrevScorecards.forEach(prevScorecard => {
    if (prevScorecard.scorecardId === action.scorecardId) {
      prevScorecard.isLoading = true;
    }
  });
  return {
    ...state,
    previousScorecards: updatedPrevScorecards
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
      total1: '',
      total2: '',
      total: '',
      isComplete: false
    },
    loading: false
  };
};

const submitScorecard = (state, action) => {
  return {
    ...state,
    currentScorecard: {
      scorecardId: '',
      holesArray: emptyHolesArray.map(emptyHole => ({ ...emptyHole })),
      total1: '',
      total2: '',
      total: '',
      isComplete: false
    },
    loading: false,
    redirectPath: '/home'
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
          locationAccuracy: action.locationAccuracy,
          isFetchingLocation: false
        };
      })
    }
  };
};

const startLocationFetching = (state, action) => {
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
          isFetchingLocation: true
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

    case actionTypes.FETCH_PREVIOUS_SCORECARD_START:
      return fetchPreviousScorecardStart(state, action);

    case actionTypes.FETCH_PREVIOUS_SCORECARD_SUCCESS:
      return fetchPreviousScorecard(state, action);

    case actionTypes.FETCH_PREVIOUS_SCORECARD_FAIL:
      return fetchPreviousScorecardFail(state, action);

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
          total1: '',
          total2: '',
          total: '',
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

    case actionTypes.START_LOCATION_FETCHING:
      return startLocationFetching(state, action);

    default:
      return state;
  }
};

export default reducer;
