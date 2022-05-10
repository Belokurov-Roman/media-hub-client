/* eslint-disable camelcase */
import addUser from '../action/userAction';
import addError from '../action/errorAction';

const THUNK_addUser = (email, password) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(response.status);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch(addUser(result));
    }
    if (response.status === 401) {
      console.log(response.status);
      dispatch(addError('Вы ввели неверный логин или пароль'));
    }
    if (response.status === 500) {
      console.log(response.status);
      dispatch(addError('Вы не заполнили все поля'));
    }
  } catch (err) {
    console.log('============================', err);
    dispatch(addError('НЕИЗВЕСТНАЯ ОШИБКА'));
    // console.log(name, email, password);
  }
};

export default THUNK_addUser;
