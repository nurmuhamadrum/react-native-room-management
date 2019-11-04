import {
  METHOD_GET,
  GET_ALL_CHECKIN_PENDING,
  GET_ALL_CHECKIN_FULFILLED,
  GET_ALL_CHECKIN_REJECTED,
  METHOD_POST,
  POST_CHECKIN_PENDING,
  POST_CHECKIN_FULFILLED,
  POST_CHECKIN_REJECTED,
  METHOD_PUT,
  PUT_CHECKIN_PENDING,
  PUT_CHECKIN_FULFILLED,
  PUT_CHECKIN_REJECTED,
} from '../config/constant';

export const fetchData = (method, bool) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_ALL_CHECKIN_PENDING;
      break;
    case METHOD_POST:
      methodType = POST_CHECKIN_PENDING;
      break;
    case METHOD_PUT:
      methodType = PUT_CHECKIN_PENDING;
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
    case METHOD_POST:
      methodType = POST_CHECKIN_FULFILLED;
      break;
    case METHOD_PUT:
      methodType = PUT_CHECKIN_FULFILLED;
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
    case METHOD_POST:
      methodType = POST_CHECKIN_REJECTED;
      break;
    case METHOD_PUT:
      methodType = PUT_CHECKIN_REJECTED;
      break;
  }
  return {
    type: methodType,
    payload: error,
    isLoading: false,
  };
};
