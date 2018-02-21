import {combineReducers} from 'redux';
import flashMessages from './flashMessages.js';
import auth from './auth.js';

export default combineReducers({
	flashMessages,
	auth
});