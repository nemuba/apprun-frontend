import {showToast, hideToast} from '../../../store/ducks/Toast';

export const showToastAsync = (toast) =>{
  return (dispatch) =>{
    setTimeout(() => {
      dispatch(showToast(toast));
    }, 100);
  }
}

export const hideToastAsync = (toast) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(hideToast());
    }, 100);
  };
};