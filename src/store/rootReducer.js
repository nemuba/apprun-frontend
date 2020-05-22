import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// reducers
import todoReducer from './ducks/Todo';
import toastReducer from './ducks/Toast';
import raceReducer from './ducks/Race';
import authReducer from './ducks/Auth';
import modalityReducer from './ducks/Modality';
import filterModalityReducer from './ducks/Modality/Filters';
import sponsorReducer from './ducks/Sponsor';
import playerReducer from './ducks/Player';
import registrationReducer from './ducks/Registration';
import modalReducer from './ducks/ModalConfirmation';
import positionReducer from './ducks/Position';
import userReducer from './ducks/User';
import dashReducer from './ducks/Home';

// rootReducer
const rootReducer= (history) => combineReducers({
  router: connectRouter(history),
  toast: toastReducer,
  auth: authReducer,
  todos: todoReducer,
  races: raceReducer,
  modalities: modalityReducer,
  modal: modalReducer,
  sponsors: sponsorReducer,
  players: playerReducer,
  registrations: registrationReducer,
  positions: positionReducer,
  users: userReducer,
  dash: dashReducer,
  filter_modality: filterModalityReducer
});

export default rootReducer;