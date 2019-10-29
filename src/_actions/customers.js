import {
  METHOD_GET,
  METHOD_POST,
  GET_ALL_CUSTOMERS_PENDING,
  GET_ALL_CUSTOMERS_FULFILLED,
  GET_ALL_CUSTOMERS_REJECTED,
  POST_CUSTOMERS_PENDING,
  POST_CUSTOMERS_FULFILLED,
  POST_CUSTOMERS_REJECTED,
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
  }
  return {
    type: methodType,
    payload: error,
    isLoading: false,
  };
};
