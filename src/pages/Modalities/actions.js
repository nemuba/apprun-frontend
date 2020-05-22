import { fetch_modalities, delete_modality } from "../../store/ducks/Modality";
import { fetch_filter_genre, fetch_filter_oar } from "../../store/ducks/Modality/Filters";

import api from '../../services/api';
import {toast} from 'react-toastify';

export const fetchModalitiesAsync = (id = 0) =>{
  return (dispatch) => {
    const url = id !== 0 ? `/modalities/${id}` : '/modalities';
    api
      .get(url)
      .then((resp) =>{
        dispatch(fetch_modalities(id !== 0 ? [resp.data] : resp.data));
      })
      .catch((erro) =>{
        toast.warn(
          "Não foi possivel buscar as modalidades contate um administrador"
        );
      }
      );
  }
}
export const filterModalitiesForGenres= (genre) =>{
  return (dispatch) => {
    const url = `/modalities?filter_genre=${genre}` ;
    api
      .get(url)
      .then((resp) => dispatch(fetch_modalities(resp.data)))
      .catch((erro) => {
        toast.warn(
          "Não foi possivel buscar as modalidades contate um administrador"
        );
      }
      );
  }
}
export const filterModalitiesForOar = (oar) => {
  return (dispatch) => {
    const url = `/modalities?filter_oar=${oar}`;
    api
      .get(url)
      .then((resp) => dispatch(fetch_modalities(resp.data)))
      .catch((erro) => {
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
    .then((resp)=> {
      if(resp.status === 201){
        toast.success("Cadastrado com sucesso!");
      }else if(resp.status === 203){
        toast.warn(resp.data[0]);
      }
    })
    .catch(()=> toast.warn("Não foi possivel cadastrar a modalidade contate o administrador do sistema!"))
  }
}

export const updateModalityAsync = (id, form) => {
  return (dispatch) => {
    api
      .patch(`/modalities/${id}`, { modality: form })
      .then((resp) => {
        if(resp.status === 200){
          toast.success("Atualizado com sucesso!");
        }else if(resp.status === 203){
          toast.warn(resp.data[0]);
        }
      })
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

export const filterModalityAsync = (modalities) => {
  return (dispatch) => {
    const genres = modalities.map(m => m.genre);
    const oars = modalities.map(m => m.oar);

    const unique = (x,i,a) => a.indexOf(x) === i;

    dispatch(fetch_filter_genre(genres.filter(unique)));
    dispatch(fetch_filter_oar(oars.filter(unique)));
  };
};
