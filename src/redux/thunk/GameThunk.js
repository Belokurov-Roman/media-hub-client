import psList from 'ps-list';
import setProcesses from '../action/yourAction';

export function getProcesses() {
  return async function (dispatch) {
    const list = await psList();
    dispatch(setProcesses(list));
  };
}


