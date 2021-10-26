import { GET_ALL_POSITIONS } from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSITIONS:
      return { ...state, positions: action.payload };
    default:
      return state;
  }
}
