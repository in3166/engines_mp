import axios from 'axios';
import { GET_SITES } from './types';
import { PART_SERVER } from '../components/Config';

export function addPart(dataToSubmit) {
  const request = axios
    .post(`${PART_SERVER}/addPart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: GET_SITES,
    payload: request,
  };
}

export function getAllSitessss(dataToSubmit) {
  const request = axios
    .post(`${PART_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: GET_SITES,
    payload: request,
  };
}
