import {
  METHOD_GET,
  METHOD_PUT,
  GET_USER_PENDING,
  GET_USER_FULFILLED,
  GET_USER_REJECTED,
  PUT_USER_PENDING,
  PUT_USER_FULFILLED,
  PUT_USER_REJECTED,
} from '../config/constant';

export const fetchData = (method, bool) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_USER_PENDING;
      break;
    case METHOD_PUT:
      methodType = PUT_USER_PENDING;
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
      methodType = GET_USER_FULFILLED;
      break;
    case METHOD_PUT:
      methodType = PUT_USER_FULFILLED;
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
      methodType = GET_USER_REJECTED;
      break;
    case METHOD_PUT:
      methodType = PUT_USER_REJECTED;
      break;
  }
  return {
    type: methodType,
    payload: error,
    isLoading: false,
  };
};
