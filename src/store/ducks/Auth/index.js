import {isAuthenticated} from '../../../services/auth';
import { createAction, createReducer } from '@reduxjs/toolkit';


const INITIAL_STATE = {
  isAuthenticated: isAuthenticated(),
  user:{},
  image_preview:""
}

export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");
export const get_current_user = createAction("GET_CURRENT_USER");
export const update_image_preview = createAction("UPDATE_IMAGE_PREVIEW");

export default createReducer(INITIAL_STATE, {
  [login]: (state, action) => ({ ...state, isAuthenticated: true }),
  [logout]: (state, action) => ({ ...state, isAuthenticated: false }),
  [get_current_user]: (state, action)=> ({...state, user: action.payload }),
  [update_image_preview]: (state, action) => ({...state, image_preview: action.payload})
});