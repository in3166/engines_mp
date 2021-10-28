import axios from 'axios';
import {
  GET_ALL_DEPARTMENTS,
  ADD_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from './types';

import { DEPARTMENT_SERVER } from '../components/Config';

export function getAllDepartments() {
  const request = axios
    .post(`${DEPARTMENT_SERVER}/getAllDepartments`)
    .then(response => response.data);

  return {
    type: GET_ALL_DEPARTMENTS,
    payload: request,
  };
}

export function addDepartment(dataToSubmit) {
  const request = axios
    .post(`${DEPARTMENT_SERVER}/addDepartment`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_DEPARTMENT,
    payload: request,
  };
}

export function updateDepartment(dataToSubmit) {
  const request = axios
    .post(`${DEPARTMENT_SERVER}/updateDepartment`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_DEPARTMENT,
    payload: request,
  };
}
