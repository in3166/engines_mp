import {
  GET_ALL_EXPERTS,
  ADD_EXPERT,
  UPDATE_EXPERT,
  DELETE_EXPERT,
} from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_EXPERTS:
      return { ...state };
    case ADD_EXPERT:
      return { ...state };
    case UPDATE_EXPERT:
      return { ...state };
    case DELETE_EXPERT:
      return { ...state };
    default:
      return state;
  }
}
