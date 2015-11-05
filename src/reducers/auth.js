import {createReducer} from 'utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER} from 'constants';
import {pushState} from 'redux-router';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        localStorage.setItem('token', payload.token);
        try {
            let decoded = jwtDecode(payload.token);
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': true,
                'token': payload.token,
                'userName': decoded.userName,
                'statusText': `You have been successfully signed in as ${decoded.userName}.`
            });
        } catch (e) {
            localStorage.removeItem('token');
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': false,
                'token': null,
                'userName': null,
                'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
            });
        }
    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        localStorage.removeItem('token');
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    },
    [LOGOUT_USER]: (state, payload) => {
        localStorage.removeItem('token');
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': 'You have been successfully logged out.'
        });
    }
});
