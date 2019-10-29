import {
  METHOD_GET,
  METHOD_POST,
  GET_ALL_ROOMS_PENDING,
  GET_ALL_ROOMS_FULFILLED,
  GET_ALL_ROOMS_REJECTED,
  POST_ROOM_PENDING,
  POST_ROOM_FULFILLED,
  POST_ROOM_REJECTED,
} from '../config/constant';

export const fetchData = (method, bool) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_ALL_ROOMS_PENDING;
      break;
    case METHOD_POST:
      methodType = POST_ROOM_PENDING;
      break;
  }

  return {
    type: methodType,
    payload: bool,
  };
};

export const fetchDataFulfilled = (method, data) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_ALL_ROOMS_FULFILLED;
      break;
    case METHOD_POST:
      methodType = POST_ROOM_FULFILLED;
      break;
  }

  return {
    type: methodType,
    payload: data,
    isLoading: false,
  };
};

export const fetchDataRejected = (method, error) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_ALL_ROOMS_REJECTED;
      break;
    case METHOD_POST:
      methodType = POST_ROOM_REJECTED;
      break;
  }
  return {
    type: methodType,
    payload: error,
    isLoading: false,
  };
};
