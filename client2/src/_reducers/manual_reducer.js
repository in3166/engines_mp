import {
  GET_ALL_MANUALS,
  DELETE_MANUALS,
  UPDATE_MANUAL,
  ADD_MANUAL,
} from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_MANUALS:
      return { ...state };
    case DELETE_MANUALS:
      return { ...state };
    case UPDATE_MANUAL:
      return { ...state };
    case ADD_MANUAL:
      return { ...state };
    default:
      return state;
  }
}
