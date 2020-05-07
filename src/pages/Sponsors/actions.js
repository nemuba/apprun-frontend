import {toast} from 'react-toastify';
import { fetch_sponsors, delete_sponsor } from "../../store/ducks/Sponsor";
import api from '../../services/api';

export const fetchSponsorsAsync = (id = 0) =>{
  return (dispatch) => {
    const url = id !== 0 ? `/sponsors/${id}` : '/sponsors';
    api
      .get(url)
      .then((resp) =>
        dispatch(fetch_sponsors(id !== 0 ? [resp.data] : resp.data))
      )
      .catch(() => {
        toast.warn(
          "Não foi possivel buscar os patrocinadores contate um administrador!"
        );
      });
  }
}

export const addSponsorAsync = (form) =>{
  return (dispatch) =>{
    api
    .post("/sponsors", {sponsor: form})
    .then(() => toast.success("Cadastrado com sucesso !"))
    .catch(() => toast.warn("Não foi possivel cadastrar o patrocinador contate o administrador !"));
  }
}

export const updateSponsorAsync = (id, form) => {
  return (dispatch) => {
    api
      .patch(`/sponsors/${id}`, { sponsor: form })
      .then(() => toast.success("atualizado com sucesso !"))
      .catch(() =>
        toast.warn(
          "Não foi possivel Atualizar o patrocinador contate o administrador !"
        )
      );
  };
};

export const fetchOptionsSponsorAsync = () => {
  return (dispatch) => {
    api
      .get("/get_sponsors")
      .then((resp) => dispatch(fetch_sponsors(resp.data)))
      .catch(() => {
        toast.warn(
          "Não foi possivel buscar os patrocinadores contate um administrador!"
        );
      });
  };
};

export const deleteSponsorsAsync = (id) => {
  return (dispatch) => {
    api
      .delete(`/sponsors/${id}`)
      .then(() => {
        dispatch(delete_sponsor(id));
        toast.success("Excluido com sucesso !");
      })
      .catch(() => {
        toast.warn(
          "Não foi possivel buscar os patrocinadores contate um administrador!"
        );
      });
  };
};