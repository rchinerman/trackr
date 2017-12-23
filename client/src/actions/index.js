import axios from 'axios';
import { FETCH_USER, FETCH_FOLLOWING_LIST, ADD_ERROR, REMOVE_ERROR } from './types';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {

  }
}

export const fetchFollowingList = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({ type: FETCH_FOLLOWING_LIST, payload: res.data });
  } catch (err) {
    dispatch({ type: ADD_ERROR, error: err })
  }
}

export const submitFollow = (region, summoner) => async dispatch => {
  try{
    dispatch({ type: REMOVE_ERROR })            
    const res = await axios.get(`/api/follow/${region}/${summoner}`); 
    return res;
  } catch (err) {
    dispatch({ type: ADD_ERROR, error: err })    
  }
}

export const pageLeave = () => async dispatch => {
  dispatch({ type: REMOVE_ERROR });  
}