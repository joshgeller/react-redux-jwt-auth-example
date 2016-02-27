import { checkHttpStatus, parseJSON } from '../utils';
import {
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST
} from '../constants';

export function registerUserFailure(error) {
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}
export function registerUserSuccess(result) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      result
    }
  }
}
export function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST
  };
}
export function registerUser(name, email, password) {
  return function(dispatch) {
    dispatch(registerUserRequest());
    return fetch('http://hearthdraft.net:3000/auth/registerUser', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(registerUserSuccess(response))
      })
      .catch(error => {
        if (error.response === undefined && error.message) {
          error.response = {
            status: 102,
            statusText: error.message
          };
        }
        dispatch(registerUserFailure(error));
      })
  };
}
