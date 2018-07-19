import * as actionTypes from './actions';

const initialState = {
    score: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INPUT_CHANGE:
            return {
                ...initialState,
                score: action.newScore
            }
    }
    return state;
}

export default reducer;