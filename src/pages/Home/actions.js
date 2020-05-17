import api from './../../services/api';
import {fetch_dash} from './../../store/ducks/Home';
import {toast} from 'react-toastify';

export function  fetchDashAsync(){
  return (dispatch) =>{
    api
    .get('/get_total')
    .then(resp => dispatch(fetch_dash(resp.data)))
    .catch(()=> toast.warn("Não foi possivel buscar as informações do dashboard"));
  }
}