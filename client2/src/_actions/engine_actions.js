import axios from 'axios';
import {
  GET_ALL_ENGINE,
  DELETE_ENGINES,
  UPDATE_ENGINE,
  ADD_ENGINE,
  ENGINE_ADD_REQ_PART,
  ENGINE_UPDATE_REQ_PART,
  DELETE_ENGINE_REQ_PART,
} from './types';
import { ENGINE_SERVER } from '../components/Config';

export function getAllEngines() {
  const request = axios
    .get(`${ENGINE_SERVER}/getAllEngines`)
    .then(response => response.data);

  return {
    type: GET_ALL_ENGINE,
    payload: request,
  };
}

export function deleteEngines(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/deleteEngines`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_ENGINES,
    payload: request,
  };
}

export function updateEngine(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/updateEngine`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_ENGINE,
    payload: request,
  };
}

export function addEngine(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/addEngine`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_ENGINE,
    payload: request,
  };
}

// 엔진 필요 부품 추가
export function addEnginRequiredPart(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/addEnginRequiredPart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ENGINE_ADD_REQ_PART,
    payload: request,
  };
}

// 엔진 필요 부품 수정
export function updateEnginRequiredPart(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/updateEnginRequiredPart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ENGINE_UPDATE_REQ_PART,
    payload: request,
  };
}

// 엔진 필요 부품 삭제
export function deleteEnginRequiredPart(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/deleteEnginRequiredPart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_ENGINE_REQ_PART,
    payload: request,
  };
}
