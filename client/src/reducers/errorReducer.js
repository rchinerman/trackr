import { ADD_ERROR, REMOVE_ERROR } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) { 
    case ADD_ERROR:
      return state[0]=[action.error];
    case REMOVE_ERROR:
      return state=[];
    default:
      return state;
  }
}