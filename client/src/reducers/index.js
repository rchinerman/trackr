import { combineReducers } from 'redux';
import authReducer from './authReducer';
import followingReducer from './followingReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  following: followingReducer,
  error: errorReducer
});