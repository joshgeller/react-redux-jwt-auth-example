import {createReducer} from '../utils';
import {REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST} from '../constants/';
//import {pushState} from 'redux-router';
//import jwtDecode from 'jwt-decode';

const initialState = {
    isRegistering: false,
    statusText: null
};

export default createReducer(initialState, {
    [REGISTER_USER_FAILURE]: (state, payload) => {
        let statusText = 'Registration Failure:';
        statusText += (payload.status === 422)
          ? `${payload.status} Username is taken`
          : `${payload.status} ${payload.statusText}`;
        return Object.assign({}, state, {
            'isRegistering': false,
            statusText
        });
    },
    [REGISTER_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isRegistering': false,
            'statusText': 'Registration was successful!'
        });
    },
    [REGISTER_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isRegistering': true,
            'statusText': 'Trying to register...'
        });
    }
});
