import {
  GET_ALL_PARTS,
  DELETE_PART,
  DELETE_PARTS,
  UPDATE_PART,
  ADD_PART,
  ENGINE_ADD_REQ_PART,
} from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PARTS:
      return { ...state, engines: action.payload };
    case DELETE_PART:
      return { ...state };
    case DELETE_PARTS:
      return { ...state };
    case UPDATE_PART:
      return { ...state };
    case ADD_PART:
      return { ...state };
    case ENGINE_ADD_REQ_PART:
      return { ...state };
    default:
      return state;
  }
}
