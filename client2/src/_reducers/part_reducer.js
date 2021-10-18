import {
  ADD_SITE_PART,
  GET_ALL_PARTS,
  DELETE_PART,
  DELETE_PARTS,
  UPDATE_PART,
  ADD_PART,
} from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case ADD_SITE_PART:
      return { ...state };
    case GET_ALL_PARTS:
      return { ...state, parts: action.payload };
    case DELETE_PART:
      return { ...state };
    case DELETE_PARTS:
      return { ...state };
    case UPDATE_PART:
      return { ...state };
    case ADD_PART:
      return { ...state };
    default:
      return state;
  }
}
