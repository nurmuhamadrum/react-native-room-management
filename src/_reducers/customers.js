import {
  GET_ALL_CUSTOMERS_PENDING,
  GET_ALL_CUSTOMERS_FULFILLED,
  GET_ALL_CUSTOMERS_REJECTED,
  POST_CUSTOMERS_PENDING,
  POST_CUSTOMERS_FULFILLED,
  POST_CUSTOMERS_REJECTED,
  PUT_CUSTOMERS_PENDING,
  PUT_CUSTOMERS_FULFILLED,
  PUT_CUSTOMERS_REJECTED,
} from '../config/constant';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const customers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS_PENDING:
    case POST_CUSTOMERS_PENDING:
    case PUT_CUSTOMERS_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
      };
    case GET_ALL_CUSTOMERS_FULFILLED:
    case POST_CUSTOMERS_FULFILLED:
    case PUT_CUSTOMERS_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_ALL_CUSTOMERS_REJECTED:
    case POST_CUSTOMERS_REJECTED:
    case PUT_CUSTOMERS_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default customers;
