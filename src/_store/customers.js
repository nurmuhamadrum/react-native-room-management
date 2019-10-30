import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/customers';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../config/constant';

const customers = (method, customerName, identityNumber, phoneNumber, id) => {
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

    case METHOD_PUT:
      // console.log(id, customerName, identityNumber, phoneNumber);
      return dispatch => {
        dispatch(fetchData(method, true));
        API.put(`/customers/${id}`, {
          name: customerName,
          identity_number: identityNumber,
          phone_number: phoneNumber,
          image: '',
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
