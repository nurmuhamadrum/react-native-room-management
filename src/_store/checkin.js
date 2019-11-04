import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/checkin';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../config/constant';

const checkin = (method, orderData, order_id) => {
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

    case METHOD_POST:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.post(`/checkin`, {
          room_id: orderData.room_id,
          customer_id: orderData.customer_id,
          duration: parseInt(orderData.duration),
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
        API.put(`/order/${order_id}`)
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
