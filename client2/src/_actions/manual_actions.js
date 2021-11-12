import axios from 'axios';
import {
  GET_ALL_MANUALS,
  DELETE_MANUALS,
  UPDATE_MANUAL,
  ADD_MANUAL,
} from './types';
import { MANUAL_SERVER } from '../components/Config';

export function getAllManuals(dataToSubmit) {
  const request = axios
    .get(`${MANUAL_SERVER}/getAllManuals`, dataToSubmit)
    .then(response => response.data);
  return {
    type: GET_ALL_MANUALS,
    payload: request,
  };
}

export function deleteManuals(dataToSubmit) {
  const request = axios
    .post(`${MANUAL_SERVER}/deleteManuals`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_MANUALS,
    payload: request,
  };
}

export function updateManual(dataToSubmit) {
  const request = axios
    .post(`${MANUAL_SERVER}/updateManual`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_MANUAL,
    payload: request,
  };
}

export function addManual(dataToSubmit) {
  const request = axios
    .post(`${MANUAL_SERVER}/addManual`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_MANUAL,
    payload: request,
  };
}
