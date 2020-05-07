import {fetch_players, delete_player} from '../../store/ducks/Player';
import api from '../../services/api';
import {toast} from 'react-toastify';

export const fetchPlayersAsync = (id = 0) =>{
  return (dispatch) => {
    const url = id !== 0 ? `/players/${id}` : '/players';
    api
      .get(url)
      .then((resp) =>
        dispatch(fetch_players(id !== 0 ? [resp.data] : resp.data))
      )
      .catch(() =>
        toast.warn("Erro ao buscar os participantes contate um administrador !")
      );
  }
}
export const fetchOptionsPlayerAsync = () => {
  return (dispatch) => {
    api
      .get("/get_players")
      .then((resp) => dispatch(fetch_players(resp.data)))
      .catch(() =>
        toast.warn("Erro ao buscar os participantes contate um administrador !")
      );
  };
};

export const addPlayerAsync = (form) => {
  return (dispatch) => {
    api
    .post("/players", {player: form})
    .then(() => toast.success("Cadastrado com sucesso"))
    .catch(() => toast.warn("Não foi possiel cadastrar o participante contate o adiministrador"));
  }
}
export const updatePlayerAsync = (id, form) => {
  return (dispatch) => {
    api
      .patch(`/players/${id}`, { player: form })
      .then(() => toast.success("Atualizado com sucesso"))
      .catch(() =>
        toast.warn(
          "Não foi possiel atualizar o participante contate o adiministrador"
        )
      );
  };
};
export const deletePlayerAsync = (id) => {
  return (dispatch) => {
    api
      .delete(`/players/${id}`)
      .then((resp) => {
        dispatch(delete_player(id));
        toast.success("Excluido com sucesso !");
      })
      .catch(() =>
        toast.warn("Erro ao buscar os participantes contate um administrador !")
      );
  };
};