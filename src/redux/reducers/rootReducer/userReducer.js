import initState from '../../init/initState';
import ADD_USER from '../../types/userTypes';

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    default:
      return state;
  }
}
