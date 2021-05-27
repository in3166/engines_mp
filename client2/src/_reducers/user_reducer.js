import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  CHANGE_USER,
  CHANGE_USER_PASSWORD,
  DELETE_USERS,
  CHANGE_ROLE,
} from '../_actions/types';

export default function doo(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case CHANGE_USER:
      return { ...state };
    case CHANGE_USER_PASSWORD:
      return { ...state };
    case DELETE_USERS:
      return { ...state };
    case CHANGE_ROLE:
      return { ...state };
    default:
      return state;
  }
}
