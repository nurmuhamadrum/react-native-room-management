import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rooms from '../_reducers/rooms';
import customers from '../_reducers/customers';
import checkin from '../_reducers/checkin';

// The Global state
const rootReducer = combineReducers({
  rooms,
  customers,
  checkin,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
