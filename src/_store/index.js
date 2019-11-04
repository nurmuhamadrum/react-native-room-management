import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rooms from '../_reducers/rooms';
import customers from '../_reducers/customers';
import checkin from '../_reducers/checkin';
import user from '../_reducers/user';

// The Global state
const rootReducer = combineReducers({
  rooms,
  customers,
  checkin,
  user,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
