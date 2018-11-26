import * as actionTypes from '../actions/actionTypes';

const emptyHolesArray = [];

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

const fetchHoleDetailsSuccess = (state, action) => {
  action.holeDetails.forEach(holeDetail => {
    emptyHolesArray.push({
      number: holeDetail.holeNumber,
      score: '',
      par: holeDetail.par,
      difficulty: holeDetail.difficulty,
      touched: false,
      yards: holeDetail.yards,
      latitude: holeDetail.latitude,
      longitude: holeDetail.longitude,
      distance: '',
      locationAccuracy: '',
      isFetchingLocation: false,
      isLoading: false,
      newLat: '',
      newLong: '',
      newAccuracy: '',
      isUpdating: false,
      isUpdateLoading: false
    });
  });
  return {
    ...state,
    loading: false
  };
};

const updateHoleDetailLocal = (state, action) => {
  const currentHolesArray = state.currentScorecard.holesArray;
  const updatedHolesArray = [];
  currentHolesArray.forEach(currentHole => {
    if (currentHole.number !== action.holeDetails.holeNumber) {
      updatedHolesArray.push(currentHole);
    } else {
      updatedHolesArray.push({
        ...currentHole,
        newLat: action.holeDetails.lat ? action.holeDetails.lat : '',
        newLong: action.holeDetails.long ? action.holeDetails.long : '',
        newAccuracy: action.holeDetails.accuracy,
        isUpdateLoading: action.holeDetails.isUpdateLoading,
        isUpdating: action.holeDetails.isUpdating
      });
    }
  });
  return {
    ...state,
    currentScorecard: {
      ...state.currentScorecard,
      holesArray: updatedHolesArray
    }
  };
};

const updateHoleDetailStart = (state, action) => {
  return state;
};

const updateHoleDetailSuccess = (state, action) => {
  const currentHolesArray = state.currentScorecard.holesArray;
  const updatedHolesArray = [];
  currentHolesArray.forEach(currentHole => {
    if (currentHole.number !== action.holeDetails.holeNumber) {
      updatedHolesArray.push(currentHole);
    } else {
      updatedHolesArray.push({
        ...currentHole,
        latitude: action.holeDetails.latitude,
        longitude: action.holeDetails.longitude,
        newLat: '',
        newLong: '',
        newAccuracy: '',
        isUpdateLoading: false,
        isUpdating: false
      });
    }
  });
  return {
    ...state,
    currentScorecard: {
      ...state.currentScorecard,
      holesArray: updatedHolesArray
    }
  };
};

const updateHoleDetailFail = (state, action) => {
  return state;
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

    case actionTypes.FETCH_HOLE_DETAILS_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_HOLE_DETAILS_SUCCESS:
      return fetchHoleDetailsSuccess(state, action);

    case actionTypes.FETCH_HOLE_DETAILS_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.UPDATE_HOLE_DETAIL_LOCAL:
      return updateHoleDetailLocal(state, action);

    case actionTypes.UPDATE_HOLE_DETAIL_START:
      return updateHoleDetailStart(state, action);

    case actionTypes.UPDATE_HOLE_DETAIL_SUCCESS:
      return updateHoleDetailSuccess(state, action);

    case actionTypes.UPDATE_HOLE_DETAIL_FAIL:
      return updateHoleDetailFail(state, action);

    default:
      return state;
  }
};

export default reducer;
