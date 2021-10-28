import axios from 'axios';
import { GET_ALL_POSITIONS, ADD_POSITION, UPDATE_POSITION } from './types';
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

export function addPosition(dataToSubmit) {
  const request = axios
    .post(`${POSITION_SERVER}/addPosition`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_POSITION,
    payload: request,
  };
}

export function updatePosition(dataToSubmit) {
  const request = axios
    .post(`${POSITION_SERVER}/updatePosition`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_POSITION,
    payload: request,
  };
}
