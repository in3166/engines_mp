import axios from 'axios';
import { GET_SITES, ADD_SITE_PART, UPDATE_SITE_PART } from './types';
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

export function addSitePart(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/addSitePart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_SITE_PART,
    payload: request,
  };
}

export function updateSitePart(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/updateSitePart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_SITE_PART,
    payload: request,
  };
}
