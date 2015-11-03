import { checkHttpStatus, parseJSON } from 'utils';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER } from 'constants';
import { pushState } from 'redux-router';

export function loginUserSuccess(token) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(err) {
    console.log(err);
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

export function logout() {
    console.log('logout');
    return {
        type: LOGOUT_USER
    }
}


export function logoutUser() {

    return (dispatch, state) => {
        dispatch(logout());
        dispatch(pushState(null, '/login'));
    }

}

export function loginUser(email, password, redirect) {

  return function(dispatch) {

    dispatch(loginUserRequest());

     return fetch(`http://localhost:3000/auth/getToken/`, {
         method: 'post',
         credentials: 'include',
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
         dispatch(loginUserSuccess(response.token));
         dispatch(pushState(null, redirect));
       })
       .catch(err => dispatch(loginUserFailure(err)))


  }
}
