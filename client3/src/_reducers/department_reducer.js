import {
  GET_ALL_DEPARTMENTS,
  ADD_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_DEPARTMENTS:
      return { ...state, department: action.payload };
    case ADD_DEPARTMENT:
      return { ...state };
    case UPDATE_DEPARTMENT:
      return { ...state };
    default:
      return state;
  }
}
