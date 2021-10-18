import axios from 'axios';
import {
  ADD_SITE_PART,
  GET_ALL_PARTS,
  DELETE_PART,
  DELETE_PARTS,
  UPDATE_PART,
  ADD_PART,
} from './types';
import { PART_SERVER } from '../components/Config';

export function addSitePart(dataToSubmit) {
  const request = axios
    .post(`${PART_SERVER}/addSitePart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_SITE_PART,
    payload: request,
  };
}

export function getAllParts(dataToSubmit) {
  const request = axios
    .post(`${PART_SERVER}/getAllParts`, dataToSubmit)
    .then(response => response.data);

  return {
    type: GET_ALL_PARTS,
    payload: request,
  };
}

export function deletePart(dataToSubmit) {
  const request = axios
    .post(`${PART_SERVER}/deletePart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_PART,
    payload: request,
  };
}

export function deleteParts(dataToSubmit) {
  const request = axios
    .post(`${PART_SERVER}/deleteParts`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_PARTS,
    payload: request,
  };
}

export function updatePart(dataToSubmit) {
  const request = axios
    .post(`${PART_SERVER}/updatePart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_PART,
    payload: request,
  };
}

export function addPart(dataToSubmit) {
  const request = axios
    .post(`${PART_SERVER}/addPart`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_PART,
    payload: request,
  };
}
