import initState from '../../init/initState';
import ERR_HANDLER from '../../types/errorTypes';

export default function errorReducer(state = initState, action) {
  switch (action.type) {
    case ERR_HANDLER:
      return action.payload;
    default:
      return state;
  }
}
