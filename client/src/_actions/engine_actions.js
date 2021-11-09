import axios from 'axios';
import { GET_ENGINES } from './types';

import { ENGINE_SERVER } from '../components/Config';

export function getAllEngines() {
  const request = axios
    .get(`${ENGINE_SERVER}/getAllEngines`)
    .then(response => response.data);

  return {
    type: GET_ENGINES,
    payload: request,
  };
}

export function getAllEngine(dataToSubmit) {
  const request = axios
    .post(`${ENGINE_SERVER}/getAllEngines2`, dataToSubmit)
    .then(response => response.data);

  return {
    type: GET_ENGINES,
    payload: request,
  };
}
