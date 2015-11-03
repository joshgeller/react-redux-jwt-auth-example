import { createReducer }  from 'utils';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from 'constants';

const initialState = {
  userEmail         : null,
  isAuthenticated   : false,
  isAuthenticating  : false,
}

export default createReducer(initialState, {
        [LOGIN_USER_REQUEST]: (state, payload) => {
          return Object.assign({}, state, {
            'isAuthenticating'  : true,
        })
    }, [LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated' : true,
            'userEmail'       : payload.userEmail
        })
    }, [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated' : false,
            'userEmail'       : null
      })
    }
});
