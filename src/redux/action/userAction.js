import ADD_USER from '../types/userTypes';

const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
})

export default addUser;
