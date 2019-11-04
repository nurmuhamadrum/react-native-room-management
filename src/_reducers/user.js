import {
  GET_USER_PENDING,
  GET_USER_FULFILLED,
  GET_USER_REJECTED,
  PUT_USER_PENDING,
  PUT_USER_FULFILLED,
  PUT_USER_REJECTED,
} from '../config/constant';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PENDING:
    case PUT_USER_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
      };
    case GET_USER_FULFILLED:
    case PUT_USER_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_USER_REJECTED:
    case PUT_USER_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default user;
