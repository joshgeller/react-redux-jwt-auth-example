import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import * as TYPES from '../../src/constants';
import * as ACTIONS from '../../src/actions';
import {mockStore} from '../mockStore';
import nock from 'nock';
import fetch from 'isomorphic-fetch';

describe('actions', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    it('loginUserSuccess should create LOGIN_USER_SUCCESS action', () => {
        expect(ACTIONS.loginUserSuccess('token')).toEqual({
            type: TYPES.LOGIN_USER_SUCCESS, payload: {
                token: 'token'
            }
        })

    })

    it('loginUserFailure should create LOGIN_USER_FAILURE action', () => {
        expect(ACTIONS.loginUserFailure({
            response: {
                status: '404',
                statusText: 'Not found'
            }
        })).toEqual({
            type: TYPES.LOGIN_USER_FAILURE, payload: {
                status: '404',
                statusText: 'Not found'
            }
        })
    })

    it('loginUserRequest should create LOGIN_USER_REQUEST action', () => {
        expect(ACTIONS.loginUserRequest()).toEqual({type: TYPES.LOGIN_USER_REQUEST})
    })

    it('logout should create LOGOUT_USER action', () => {
        expect(ACTIONS.logout()).toEqual({type: TYPES.LOGOUT_USER})
    })

    it('receiveProtectedData should create RECEIVE_PROTECTED_DATA action', () => {
        expect(ACTIONS.receiveProtectedData('data')).toEqual({
            type: TYPES.RECEIVE_PROTECTED_DATA, payload: {
                data: 'data'
            }
        })
    })

    it('fetchProtectedDataRequest should create FETCH_PROTECTED_DATA_REQUEST action', () => {
        expect(ACTIONS.fetchProtectedDataRequest()).toEqual({type: TYPES.FETCH_PROTECTED_DATA_REQUEST})
    })

    it('logoutAndRedirect should create logout and pushState actions', (done) => {

        const expectedActions = [
            {
                type: TYPES.LOGOUT_USER
            }, {
                type: '@@reduxReactRouter/historyAPI',
                payload: {
                    method: 'pushState',
                    args: [
                        null, '/login'
                    ]
                }
            }
        ]

        const store = mockStore({}, expectedActions, done);
        store.dispatch(ACTIONS.logoutAndRedirect());
    })

    it('fetchProtectedDataRequest should create logout and pushState actions when API returns 401', (done) => {

        const expectedActions = [
            {
                type: TYPES.FETCH_PROTECTED_DATA_REQUEST
            }, {
                type: TYPES.LOGIN_USER_FAILURE,
                payload: {
                    status: 401,
                    statusText: 'Unauthorized'
                }
            }, {
                type: '@@reduxReactRouter/historyAPI',
                payload: {
                    method: 'pushState',
                    args: [
                        null, '/login'
                    ]
                }
            }
        ]

        nock('http://localhost:3000/')
             .get('/getData/')
             .reply(401)

        const store = mockStore({}, expectedActions, done);
        store.dispatch(ACTIONS.fetchProtectedData('token'));

    })

    it('fetchProtectedDataRequest should create RECEIVE_PROTECTED_DATA actions when API returns 200', (done) => {

        const expectedActions = [
            {
                type: TYPES.FETCH_PROTECTED_DATA_REQUEST
            }, {
                type: TYPES.RECEIVE_PROTECTED_DATA,
                payload: {
                    data: 'data'
                }
            }
        ]

        nock('http://localhost:3000/')
             .get('/getData/')
             .reply(200, {data: 'data'})

        const store = mockStore({}, expectedActions, done);
        store.dispatch(ACTIONS.fetchProtectedData('token'));

    })

    it('loginUser should create LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, and PUSH_STATE actions when API returns 200', (done) => {

        const expectedActions = [
            {
                type: TYPES.LOGIN_USER_REQUEST
            }, {
                type: TYPES.LOGIN_USER_SUCCESS,
                payload: {
                    token: 'token'
                }
            }, {
                type: '@@reduxReactRouter/historyAPI',
                payload: {
                    method: 'pushState',
                    args: [
                        null, '/'
                    ]
                }
            }
        ]

        nock('http://localhost:3000/')
             .post('/auth/getToken/')
             .reply(200, {token: 'token'})

        const store = mockStore({}, expectedActions, done);
        store.dispatch(ACTIONS.loginUser());

    })

    it('loginUser should create LOGIN_USER_REQUEST and LOGIN_USER_FAILURE actions when API returns 401', (done) => {

        const expectedActions = [
            {
                type: TYPES.LOGIN_USER_REQUEST
            }, {
                type: TYPES.LOGIN_USER_FAILURE,
                payload: {
                    status: 401,
                    statusText: 'Unauthorized'
                }
            }
        ]

        nock('http://localhost:3000/')
             .post('/auth/getToken/')
             .reply(401)

        const store = mockStore({}, expectedActions, done);
        store.dispatch(ACTIONS.loginUser());

    })

})
