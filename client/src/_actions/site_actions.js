import axios from 'axios';
import { GET_SITES } from './types';

import { SITE_SERVER } from '../components/Config';

export function getAllSites() {
  const request = axios
    .get(`${SITE_SERVER}/getAllSites`)
    .then(response => response.data);

  return {
    type: GET_SITES,
    payload: request,
  };
}

export function getAllEngine(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/getAllEngines2`, dataToSubmit)
    .then(response => response.data);

  return {
    type: GET_SITES,
    payload: request,
  };
}
