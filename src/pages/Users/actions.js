import api from '../../services/api';
import {toast} from 'react-toastify';
import {logout} from '../../store/ducks/Auth';
import { fetch_users, delete_user } from '../../store/ducks/User';
import { logout as RemoveToken } from '../../services/auth';
import {store} from './../../store';
import { push } from 'connected-react-router';


export const updateUserInfoAsync = (id, form) =>{
  return (dispatch) =>{
    api
    .patch(`/users/${id}`, {user: form})
    .then(() => {
      dispatch(logout());
      RemoveToken();
      toast.success("Informações do usuário Atualizado, Faça Login novamente!");

    })
    .catch(()=> toast.warn("Não foi possivel atualizar usuário !"));
  }
}
export const updateUserAsync = (id, form) => {
  return (dispatch) => {
    api
      .patch(`/users/${id}`, { user: form })
      .then(() => {
        toast.success("Atualizado com sucesso !");
      })
      .catch(() => toast.warn("Não foi possivel atualizar usuário !"));
  }
}
export const addUserAsync = (form) => {
  return (dispatch) => {
    api
      .post(`/users`, { user: form })
      .then(() => {
        toast.success("Usuário cadastrado !");
      })
      .catch(() => toast.warn("Não foi possivel cadastrar usuário !"));
  }
}

export const fetchUserAsync = (id = 0) => {
  return (dispatch) => {
    const url = id !== 0 ? `/users/${id}` : '/users';
    api
      .get(url)
      .then((resp) => dispatch(fetch_users(id !== 0 ? [resp.data] : resp.data)))
      .catch(() => toast.warn("Não foi possivel buscar os usuários !"));
  }
}

export const deleteUserAsync = (id) => {
  return (dispatch) => {
    const user = store.getState().auth.user;

    api
      .delete(`/users/${id}`)
      .then(() => {
        dispatch(delete_user(id));
        toast.success("Excluido com sucesso !");
        if(user.id === id){
          RemoveToken();
          dispatch(push("/login"));
        }
      })
      .catch(() => toast.warn("Não foi possivel excluir usuário !"));
  }
}