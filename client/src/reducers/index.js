import { combineReducers } from 'redux';
import authReducer from './authReducer';
import followingReducer from './followingReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';

export default combineReducers({
  auth: authReducer,
  following: followingReducer,
  error: errorReducer,
  followSuccess: successReducer
});