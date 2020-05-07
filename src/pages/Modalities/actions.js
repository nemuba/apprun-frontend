import { fetch_modalities, delete_modality } from "../../store/ducks/Modality";
import api from '../../services/api';
import {toast} from 'react-toastify';

export const fetchModalitiesAsync = (id = 0 ) =>{
  return (dispatch) => {
    const url = id !== 0 ? `/modalities/${id}` : '/modalities';
    api
      .get(url)
      .then((resp) => dispatch(fetch_modalities(id !== 0 ? [resp.data] : resp.data)))
      .catch((erro) =>{
        console.log(erro);
        toast.warn(
          "Não foi possivel buscar as modalidades contate um administrador"
        );
      }
      );
  }
}

export const addModalityAsync = (form) =>{
  return (dispatch) => {
    api
    .post("/modalities", {modality: form})
    .then(()=> toast.success("Cadastrado com sucesso!"))
    .catch(()=> toast.warn("Não foi possivel cadastrar a modalidade contate o administrador do sistema!"))
  }
}

export const updateModalityAsync = (id, form) => {
  return (dispatch) => {
    api
      .patch(`/modalities/${id}`, { modality: form })
      .then(() => toast.success("Atualizado com sucesso!"))
      .catch(() =>
        toast.warn(
          "Não foi possivel atualizar a modalidade contate o administrador do sistema!"
        )
      );
  };
};

export const fetchOptionsModalityAsync = (id = 0 ) =>{
  return (dispatch) => {
    const url = id !== 0 ? `/get_race/${id}/modalities` : "/get_modalities";
    api
    .get(url)
    .then(resp => dispatch(fetch_modalities(resp.data)))
    .catch(() => toast.warn("Não foi possivel buscar as modalidades."));
  }
}

export const deleteModalitiesAsync = (id) => {
  return (dispatch) => {
    api
      .delete(`/modalities/${id}`)
      .then((resp) => {
        dispatch(delete_modality(id));
        toast.success("Excluido com sucesso !");
      })
      .catch(() =>
        toast.warn(
          "Não foi possivel buscar as modalidades contate um administrador"
        )
      );
  };
};