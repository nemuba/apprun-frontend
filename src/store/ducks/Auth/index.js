import {isAuthenticated} from '../../../services/auth';
import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isAuthenticated: isAuthenticated(),
  user:{}
}

export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");
export const get_current_user = createAction("GET_CURRENT_USER");

export default createReducer(INITIAL_STATE, {
  [login]: (state, action) => ({ ...state, isAuthenticated: true }),
  [logout]: (state, action) => ({ ...state, isAuthenticated: false }),
  [get_current_user]: (state, action)=> ({...state, user: action.payload })
});