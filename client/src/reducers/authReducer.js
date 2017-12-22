import { FETCH_USER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // if user is logged out, action.payload === "", and we will return false
    default:
      return state;
  }
}