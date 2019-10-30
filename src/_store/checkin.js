import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/checkin';
import {API} from '../config/api';
import {METHOD_GET} from '../config/constant';

const checkin = method => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.get(`/checkin`)
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

export default checkin;
