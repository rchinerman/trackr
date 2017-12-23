import { ADD_ERROR, CLEAR_STATE } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) { 
    case ADD_ERROR:
      return state[0]=[action.error];
    case CLEAR_STATE:
      return state=[];
    default:
      return state;
  }
}