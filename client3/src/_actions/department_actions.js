import axios from 'axios';
import { GET_ALL_DEPARTMENTS } from './types';
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

export function getAllDepartments2(dataToSubmit) {
  const request = axios
    .post(`${DEPARTMENT_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: GET_ALL_DEPARTMENTS,
    payload: request,
  };
}
