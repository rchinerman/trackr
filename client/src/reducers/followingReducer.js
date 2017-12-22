import { FETCH_FOLLOWING_LIST } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_FOLLOWING_LIST:
      return action.payload || false; // if user is logged out, action.payload === "", and we will return false
    default:
      return state;
  }
}