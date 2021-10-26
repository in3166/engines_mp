import axios from 'axios';
import { GET_ALL_POSITIONS } from './types';
import { POSITION_SERVER } from '../components/Config';

export function getAllPositions() {
  const request = axios
    .post(`${POSITION_SERVER}/getAllPositions`)
    .then(response => response.data);

  return {
    type: GET_ALL_POSITIONS,
    payload: request,
  };
}

export function getAllPositions2(dataToSubmit) {
  const request = axios
    .post(`${POSITION_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: GET_ALL_POSITIONS,
    payload: request,
  };
}
