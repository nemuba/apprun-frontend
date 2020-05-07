import {get_current_user, logout} from '../../store/ducks/Auth';
import {logout as RemoveToken} from '../../services/auth';
import api from '../../services/api';
import { toast } from 'react-toastify';
import {push} from 'connected-react-router';

export const getCurrentUserAsync = () =>{
  return (dispatch)=>{
    api
      .get("/current_user")
      .then((resp) => dispatch(get_current_user(resp.data)))
      .catch(() => {
        dispatch(logout());
        RemoveToken();
        toast.warn("Entre com sua cedrenciais !");
        dispatch(push('/login'));
      });
  }
}