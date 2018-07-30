import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    };
};

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    };
};