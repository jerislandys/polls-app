import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import pollReducer from './pollReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  poll: pollReducer
});
