import { combineReducers } from 'redux';
import processReducer from './processReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import activeReducer from './activeReducer';

const rootReducers = combineReducers({
  processes: processReducer,
  user: userReducer,
  error: errorReducer,
  active: activeReducer,
});

export default rootReducers;
