import { combineReducers } from 'redux';
import authReducer from './authReducer';
import followingReducer from './followingReducer';

export default combineReducers({
  auth: authReducer,
  following: followingReducer
});