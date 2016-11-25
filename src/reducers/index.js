import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import auth from './auth';
import register from './register';
import data from './data';

export default combineReducers({
 auth,
 register,
 data,
 router: routerStateReducer
});
