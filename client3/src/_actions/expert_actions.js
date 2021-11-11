import axios from 'axios';
import {
  GET_ALL_EXPERTS,
  ADD_EXPERT,
  UPDATE_EXPERT,
  DELETE_EXPERT,
} from './types';
import { EXPERT_SERVER } from '../components/Config';

export function getAllExperts() {
  const request = axios
    .get(`${EXPERT_SERVER}/getAllExperts`)
    .then(response => response.data);

  return {
    type: GET_ALL_EXPERTS,
    payload: request,
  };
}

export function addExpert(dataToSubmit) {
  const request = axios
    .post(`${EXPERT_SERVER}/addExpert`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_EXPERT,
    payload: request,
  };
}

export function updateExpert(dataToSubmit) {
  const request = axios
    .post(`${EXPERT_SERVER}/updateExpert`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_EXPERT,
    payload: request,
  };
}

export function deleteExpert(dataToSubmit) {
  const request = axios
    .post(`${EXPERT_SERVER}/deleteExpert`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_EXPERT,
    payload: request,
  };
}
