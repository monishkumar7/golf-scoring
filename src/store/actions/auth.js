import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return dispatch => {
        axios.get("https://reqres.in/api/users/2.json")
            .then(response => {
                dispatch(authSuccess(response.data.data.first_name+' '+response.data.data.last_name));
            })
            .catch(error => {
                dispatch(authFail());
            });
    }
};

export const authSuccess = (userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId
    };
};

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    };
};