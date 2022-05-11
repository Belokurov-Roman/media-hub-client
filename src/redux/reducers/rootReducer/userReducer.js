import initState from '../../init/initState';
import ADD_USER, { DELETE_USER } from '../../types/userTypes';

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    case DELETE_USER:
      return null;
    default:
      return state;
  }
}
