import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/customers';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST} from '../config/constant';

const customers = (method, customerName, identityNumber, phoneNumber) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.get(`/customers`)
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
        API.post(`/customers`, {
          name: customerName,
          identity_number: identityNumber,
          phone_number: phoneNumber,
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

export default customers;
