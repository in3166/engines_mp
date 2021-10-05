import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  CHANGE_USER,
  CHANGE_USER_PASSWORD,
  DELETE_USERS,
  CHANGE_ROLE,
  UPDATE_USER,
} from './types';
import USER_SERVER from '../components/Config';

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function changeUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/changeUser`, dataToSubmit)
    .then(response => response.data);

  return {
    type: CHANGE_USER,
    payload: request,
  };
}

export function changePassord(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/changePassword`, dataToSubmit)
    .then(response => response.data);

  return {
    type: CHANGE_USER_PASSWORD,
    payload: request,
  };
}

export function deleteUsers(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/deleteUsers`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_USERS,
    payload: request,
  };
}

export function changeRole(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/changeRole`, dataToSubmit)
    .then(response => response.data);

  return {
    type: CHANGE_ROLE,
    payload: request,
  };
}

export function updateUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/updateUser`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_USER,
    payload: request,
  };
}
