import axios from 'axios';
import { GET_SITES } from './types';
import { SITE_SERVER } from '../components/Config';

export function getAllSites() {
  const request = axios
    .post(`${SITE_SERVER}/getAllSites`)
    .then(response => response.data);

  return {
    type: GET_SITES,
    payload: request,
  };
}

export function getAllSitessss(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: GET_SITES,
    payload: request,
  };
}
