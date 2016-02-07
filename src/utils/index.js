import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { pushState } from 'redux-router';

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
     return response.json()
}

export const requireAuthentication = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  // convert history location descriptor from 2.0 to 1.0
  redirectAction: ({ pathname, query }) => {
    if (query.redirect) {
      return pushState(null, `${pathname}?next=${query.redirect}`)
    } else {
      return pushState(null, pathname)
    }
  },
  wrapperDisplayName: 'UserIsJWTAuthenticated'
})
