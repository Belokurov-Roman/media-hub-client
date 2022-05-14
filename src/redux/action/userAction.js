import ADD_USER, { DELETE_USER } from '../types/userTypes';

const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});
export const deleteUser = (user) => ({
  type: DELETE_USER,
});

export default addUser;
