import {
  METHOD_GET,
  GET_ALL_CUSTOMERS_PENDING,
  GET_ALL_CUSTOMERS_FULFILLED,
  GET_ALL_CUSTOMERS_REJECTED,
  METHOD_POST,
  POST_CUSTOMERS_PENDING,
  POST_CUSTOMERS_FULFILLED,
  POST_CUSTOMERS_REJECTED,
  METHOD_PUT,
  PUT_CUSTOMERS_PENDING,
  PUT_CUSTOMERS_FULFILLED,
  PUT_CUSTOMERS_REJECTED,
} from '../config/constant';

export const fetchData = (method, bool) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_ALL_CUSTOMERS_PENDING;
      break;
    case METHOD_POST:
      methodType = POST_CUSTOMERS_PENDING;
      break;
    case METHOD_PUT:
      methodType = PUT_CUSTOMERS_PENDING;
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
      methodType = GET_ALL_CUSTOMERS_FULFILLED;
      break;
    case METHOD_POST:
      methodType = POST_CUSTOMERS_FULFILLED;
      break;
    case METHOD_PUT:
      methodType = PUT_CUSTOMERS_FULFILLED;
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
      methodType = GET_ALL_CUSTOMERS_REJECTED;
      break;
    case METHOD_POST:
      methodType = POST_CUSTOMERS_REJECTED;
      break;
    case METHOD_PUT:
      methodType = PUT_CUSTOMERS_REJECTED;
      break;
  }
  return {
    type: methodType,
    payload: error,
    isLoading: false,
  };
};
