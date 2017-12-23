import { FOLLOW_SUCCESS, CLEAR_STATE } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) { 
    case FOLLOW_SUCCESS:
      return state=true;
    case CLEAR_STATE:
      return state=null;
    default:
      return state;
  }
}