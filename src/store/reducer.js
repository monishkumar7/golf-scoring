import * as actionTypes from './actions';

const initialState = {
    holesArray: [
        {id: 1, value: '', par: 3},
        {id: 2, value: '', par: 3},
        {id: 3, value: '', par: 3},
        {id: 4, value: '', par: 3},
        {id: 5, value: '', par: 3},
        {id: 6, value: '', par: 3},
        {id: 7, value: '', par: 3},
        {id: 8, value: '', par: 3},
        {id: 9, value: '', par: 3},
        {id: 10, value: '', par: 3},
        {id: 11, value: '', par: 3},
        {id: 12, value: '', par: 3},
        {id: 13, value: '', par: 3},
        {id: 14, value: '', par: 3},
        {id: 15, value: '', par: 3},
        {id: 16, value: '', par: 3},
        {id: 17, value: '', par: 3},
        {id: 18, value: '', par: 3},
    ],
    total1: '',
    total2: '',
    total: 70
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INPUT_CHANGE:
            return {
                ...initialState,
                score: action.newScore
            }
        default:
            return state;
    }
}

export default reducer;