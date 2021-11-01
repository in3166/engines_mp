import {
  GET_ALL_SITES,
  ADD_SITE,
  UPDATE_SITE,
  DELETE_SITE,
} from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_SITES:
      return { ...state, positions: action.payload };
    case ADD_SITE:
      return { ...state };
    case UPDATE_SITE:
      return { ...state };
    case DELETE_SITE:
      return { ...state };
    default:
      return state;
  }
}
