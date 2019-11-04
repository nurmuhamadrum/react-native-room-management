import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/user';
import {API} from '../config/api';
import {METHOD_GET, METHOD_PUT} from '../config/constant';

const user = (method, user_id, data) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.get(`/profile/${user_id}`)
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
        API.put(`/profile/${user_id}`, data)
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            dispatch(fetchDataRejected(method, error));
          });
      };
  }
};

export default user;
