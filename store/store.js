import {applyMiddleware, legacy_createStore} from 'redux';
import {employeeReducer} from './employeeReducer';
import {stateLogger} from './middleware/state-logger';

export const store = legacy_createStore(
  employeeReducer,
  applyMiddleware(stateLogger)
);
