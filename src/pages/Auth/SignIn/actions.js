import {push} from 'connected-react-router';
import {toast} from 'react-toastify';
import {login} from '../../../store/ducks/Auth';
import api from '../../../services/api';
import {login as setToken} from "../../../services/auth";

export const loginAsyn = (form) =>{
  return (dispatch) => {
    api
      .post('/user_token', {auth: form})
      .then(resp => {
        dispatch(login());
        setToken(resp.data.jwt);
        dispatch(push("/"));
        toast.success('Logado com sucesso !');
      })
      .catch(()=> toast.warn("Usuário e senha incorreto. Tente novamente !"));
  }
}