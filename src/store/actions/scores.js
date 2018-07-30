import * as actionTypes from './actionTypes';

export const inputChange = (score, id) => {
return {
    type: actionTypes.INPUT_CHANGE,
    newScore: score,
    holeId: id
};
};

export const resetScore = () => {
return {
    type: actionTypes.RESET_SCORE
};
};