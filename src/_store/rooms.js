import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/rooms';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../config/constant';

const rooms = (method, roomName, id) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.get(`/rooms`)
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            dispatch(fetchDataRejected(method, error));
          });
      };

    case METHOD_POST:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.post(`/rooms`, {
          name: roomName,
        })
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            dispatch(fetchDataRejected(method, error));
          });
      };

    case METHOD_PUT:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.put(`/room/${id}`, {
          name: roomName,
        })
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            dispatch(fetchDataRejected(method, error));
          });
      };

    default:
      return method;
  }
};

export default rooms;

// const rooms = () => {
//   return dispatch => {
//     {
//       dispatch(fetchData(true));
//       API.get(`/rooms`)
//         .then(res => {
//           dispatch(fetchDataFulfilled(res.data));
//         })
//         .catch(error => {
//           dispatch(fetchDataRejected(error));
//         });
//     }
//   };
// };
