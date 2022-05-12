/* eslint-disable default-param-last */
const processReducer = (state = '', action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_ACTIVE':
      return payload;
    default:
      return state;
  }
};

export default processReducer;
