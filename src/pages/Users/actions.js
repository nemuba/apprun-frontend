import api from '../../services/api';
import {toast} from 'react-toastify';
import {logout} from '../../store/ducks/Auth';
import { logout as RemoveToken } from '../../services/auth';


export const updateUserAsync = (id, form) =>{
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
export const addUserAsync = (form) => {
  return (dispatch) => {
    api
      .patch(`/users`, { user: form })
      .then(() => {
        toast.success("Usuário cadastrado !");
      })
      .catch(() => toast.warn("Não foi possivel cadastrar usuário !"));
  }
}