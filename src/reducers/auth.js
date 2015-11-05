import {createReducer} from 'utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER} from 'constants';
import {pushState} from 'redux-router';

const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true
        });
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        localStorage.setItem('token', payload.token);
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token
        });
    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null
        });
    },
    [LOGOUT_USER]: (state, payload) => {
        localStorage.removeItem('token');
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null
        });
    }
});
