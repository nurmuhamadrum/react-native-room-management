import {
  METHOD_GET,
  GET_ALL_CHECKIN_PENDING,
  GET_ALL_CHECKIN_FULFILLED,
  GET_ALL_CHECKIN_REJECTED,
} from '../config/constant';

export const fetchData = (method, bool) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_ALL_CHECKIN_PENDING;
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
      methodType = GET_ALL_CHECKIN_FULFILLED;
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
      methodType = GET_ALL_CHECKIN_REJECTED;
      break;
  }
  return {
    type: methodType,
    payload: error,
    isLoading: false,
  };
};
