import { combineReducers } from 'redux';
import processReducer from './processReducer';

const rootReducers = combineReducers({
  processes: processReducer,
});

export default rootReducers;
