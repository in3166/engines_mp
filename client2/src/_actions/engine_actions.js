import axios from 'axios';
import {
  GET_ALL_PARTS,
  DELETE_PARTS,
  UPDATE_PART,
  ADD_PART,
  ENGINE_ADD_REQ_PART,
} from './types';
import { ENGINE_SERVER } from '../components/Config';

export function getAllEngines() {
  const request = axios
    .post(`${ENGINE_SERVER}/getAllEngines`)
    .then(response => response.data);

  return {
    type: GET_ALL_PARTS,
    payload: request,
  };
}

export function deleteEngines(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/deleteEngines`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_PARTS,
    payload: request,
  };
}

export function updateEngine(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/updateEngine`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_PART,
    payload: request,
  };
}

export function addEngine(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/addEngine`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_PART,
    payload: request,
  };
}

// 엔진 필요 부푸 추가
export function addEnginRequiredPart(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/addEnginRequiredPart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ENGINE_ADD_REQ_PART,
    payload: request,
  };
}
