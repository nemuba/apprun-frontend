import {toast} from 'react-toastify';
import {fetch_registrations, delete_registration} from './../../store/ducks/Registration';
import api from './../../services/api';

export const fetchRegistrationsAsync = (id = 0) =>{
  return (dispatch) => {
    const url = id !== 0 ? `/registrations/${id}` : '/registrations';
    api
      .get(url)
      .then((resp) => dispatch(fetch_registrations(id !== 0 ? [resp.data] : resp.data)))
      .catch(() =>
        toast.warn(
          "Não foi possivel buscar as inscrições contate um administrador!"
        )
      );
  }
}

export const addRegistrationAsync = (form) =>{
  return (dispatch) =>{
    api
    .post("/registrations", {registration: form})
    .then((resp)=> {
      if(resp.status !== 226){
        toast.success("Cadastrado com sucesso");
      }else{
        const msg = resp.data;
        toast.warn(`${msg.race_id} . Tente novamente.`);
      }
    })
    .catch((error) => {
      toast.warn("Erro ao cadastrar inscrição contate o admnistrador");
    });
  }
}

export const updateRegistrationAsync = (id, form) => {
  return (dispatch) => {
    api
      .patch(`/registrations/${id}`, { registration: form })
      .then((resp) => {
        if (resp.status !== 226) {
          toast.success("Atualizado com sucesso");
        } else {
          const msg = resp.data;
          toast.warn(`${msg.race_id}. Tente novamente.`);
        }
      })
      .catch((error) => {
        toast.warn("Erro ao cadastrar inscrição contate o admnistrador");
      });
  }
}

export const deleteRegistrationAsync = (id) =>{
  return (dispatch) => {
    api
    .delete(`/registrations/${id}`)
    .then(() => {
      dispatch(delete_registration(id));
      toast.success("Excluido com sucesso");
    })
    .catch(() => toast.warn("Não foi possivel excluir a inscrição contate o administrador"));
  }
}