import {
  GET_ALL_POSITIONS,
  ADD_POSITION,
  UPDATE_POSITION,
  DELETE_POSITION,
} from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSITIONS:
      return { ...state, positions: action.payload };
    case ADD_POSITION:
      return { ...state };
    case UPDATE_POSITION:
      return { ...state };
    case DELETE_POSITION:
      return { ...state };
    default:
      return state;
  }
}
