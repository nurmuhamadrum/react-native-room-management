import {
  GET_ALL_CHECKIN_PENDING,
  GET_ALL_CHECKIN_FULFILLED,
  GET_ALL_CHECKIN_REJECTED,
} from '../config/constant';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const checkin = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHECKIN_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
      };
    case GET_ALL_CHECKIN_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_ALL_CHECKIN_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default checkin;
