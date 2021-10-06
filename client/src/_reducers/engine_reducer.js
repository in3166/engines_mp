import { GET_ENGINES } from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_ENGINES:
      return { ...state, engines: action.payload };
    default:
      return state;
  }
}
