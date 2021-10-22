import { GET_ALL_DEPARTMENTS } from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_DEPARTMENTS:
      return { ...state, department: action.payload };
    default:
      return state;
  }
}
