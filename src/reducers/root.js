import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import * as reducers from '../reducers';

const rootReducer = combineReducers({
  routing: routeReducer,
  ...reducers
});

export default rootReducer;
