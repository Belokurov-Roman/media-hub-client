import { combineReducers } from 'redux';
import processReducer from './processReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

const rootReducers = combineReducers({
  processes: processReducer,
  user: userReducer,
  error: errorReducer,
});

export default rootReducers;
