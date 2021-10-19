import { GET_SITES, ADD_SITE_PART, UPDATE_SITE_PART } from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case GET_SITES:
      return { ...state, sites: action.payload };
    case ADD_SITE_PART:
      return { ...state };
    case UPDATE_SITE_PART:
      return { ...state };
    default:
      return state;
  }
}
