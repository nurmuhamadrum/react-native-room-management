import {
  GET_ALL_ROOMS_PENDING,
  GET_ALL_ROOMS_FULFILLED,
  GET_ALL_ROOMS_REJECTED,
  POST_ROOM_PENDING,
  POST_ROOM_FULFILLED,
  POST_ROOM_REJECTED,
} from '../config/constant';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROOMS_PENDING:
    case POST_ROOM_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
      };
    case GET_ALL_ROOMS_FULFILLED:
    case POST_ROOM_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_ALL_ROOMS_REJECTED:
    case POST_ROOM_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default rooms;
