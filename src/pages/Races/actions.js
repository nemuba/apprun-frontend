import {toast} from 'react-toastify';
import {fetch_races, delete_race, add_race} from '../../store/ducks/Race';
import api from '../../services/api';

export const fetchRacesAsync = (id = 0) =>{
  return (dispatch) => {
    const url = id !== 0 ? `/races/${id}` : '/races';
    api
    .get(url)
    .then(resp => dispatch(fetch_races(id !== 0 ? [resp.data] : resp.data)))
    .catch(()=> toast.warn("Não foi possivel buscar as corridas contate um administrador !"));
  }
}

export const fetchOptionsRaceAsync = () => {
  return (dispatch) => {
    api
      .get("/get_races")
      .then((resp) => dispatch(fetch_races(resp.data)))
      .catch(() =>
        toast.warn(
          "Não foi possivel buscar as corridas contate um administrador !"
        )
      );
  };
};

export const deleteRaceAsync = (id) => {
  return (dispatch) => {
    api
      .delete(`/races/${id}`)
      .then((resp) => {
        dispatch(delete_race(id));
        toast.success("Excluido com sucesso !");
      })
      .catch(() =>
        toast.warn(
          "Não foi possivel excluir a corrida contate um administrador !"
        )
      );
  };
};

export const addRaceAsync = (race) => {
  return (dispatch) => {
    api
      .post('/races', {race})
      .then((resp) => {
        dispatch(add_race(resp.data));
        toast.success("Cadastrado com sucesso !");
      })
      .catch(() =>
        toast.warn(
          "Não foi possivel cadastrar a corrida contate um administrador !"
        )
      );
  };
};

export const updateRaceAsync = (id, form) => {

  return (dispatch) => {
    api
      .patch(`/races/${id}`, { race: form })
      .then(() => {
        toast.success("Atualizado com sucesso !");
      })
      .catch(() =>
        toast.warn(
          "Não foi possivel atualizar a corrida contate um administrador !"
        )
      );
  };

};