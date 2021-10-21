import {
  GET_ALL_ENGINE,
  DELETE_ENGINES,
  UPDATE_ENGINE,
  ADD_ENGINE,
  ENGINE_ADD_REQ_PART,
  ENGINE_UPDATE_REQ_PART,
  DELETE_ENGINE_REQ_PART,
} from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_ENGINE:
      return { ...state, engines: action.payload };
    case DELETE_ENGINES:
      return { ...state };
    case UPDATE_ENGINE:
      return { ...state };
    case ADD_ENGINE:
      return { ...state };
    case ENGINE_ADD_REQ_PART:
      return { ...state };
    case ENGINE_UPDATE_REQ_PART:
      return { ...state };
    case DELETE_ENGINE_REQ_PART:
      return { ...state };
    default:
      return state;
  }
}
