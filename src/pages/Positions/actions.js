import {fetch_positions, delete_position} from '../../store/ducks/Position';
import api from '../../services/api';
import { toast } from 'react-toastify';

export const fetchPositionsAsync = (id = 0) =>{
  return (dispatch)=>{
    const url = id !== 0 ? `/positions/${id}` : '/positions';
    api
    .get(url)
    .then(resp => dispatch(fetch_positions(id !== 0 ? [resp.data] : resp.data)))
    .catch(()=> toast.warn("Não foi possivel buscar as posições. Contate um administrador"));
  }
}

export const deletePositionAsync = (id) => {
  return (dispatch) => {
    const url = `/positions/${id}`;
    api
      .delete(url)
      .then(() => {
        dispatch(delete_position(id));
        toast.success("Excluido com sucesso !");
      })
      .catch(() => toast.warn("Não foi possivel excluir a posição. Contate um administrador"));
  }
}

export const addPositionAsync = (form) =>{
  return (dispatch)=>{
    api
    .post('/positions',{position: form})
    .then(() => {
      toast.success("Cadastrado com sucesso !");
    })
    .catch(()=>{
      toast.warn("Não foi possivel cadastrar posição. Contate um administrador !");
    });
  }
}

export const updatePositionAsync = (id, form) => {
  return (dispatch) => {
    api
      .patch(`/positions/${id}`, { position: form })
      .then(() => {
        toast.success("Atualizado com sucesso !");
      })
      .catch(() => {
        toast.warn("Não foi possivel atualizar posição. Contate um administrador !");
      });
  }
}