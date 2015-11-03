import { checkHttpStatus, parseJSON } from 'utils';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from 'constants';

export function loginUserSuccess(response) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      response: response
    }
  }
}

export function loginUserFailure(err) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      err: err
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function loginUser(email, password) {

  return function(dispatch) {

    dispatch(loginUserRequest());

    return fetch(`http://127.0.0.1:8000/auth/login/`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(loginUserSuccess(response));
      })
      .catch(err => dispatch(loginUserFailure(err)))
  }
}
