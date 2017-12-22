import axios from 'axios';
import { FETCH_USER, FETCH_FOLLOWING_LIST } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchFollowingList = () => async dispatch => {
  const res = await axios.get('/api/profile');
  console.log(res);
  dispatch({ type: FETCH_FOLLOWING_LIST, payload: res.data });
}