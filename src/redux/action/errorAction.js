import ERR_HANDLER from '../types/errorTypes';

const addError = (error) => ({
  type: ERR_HANDLER,
  payload: error,
});

export default addError;
