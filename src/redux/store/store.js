import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import initState from '../init/initState';
import rootReducer from '../reducers/rootReducer/rootReduser';

export default createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)));
