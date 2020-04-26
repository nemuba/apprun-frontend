import { createReducer, createAction } from '@reduxjs/toolkit';

const INITIAL_STATE = []

export const addTodo = createAction('ADD_TODO');
export const removeTodo = createAction("REMOVE_TODO");


export default createReducer(INITIAL_STATE,{
  [addTodo.type]: (state, action) => [...state, action.payload],
  [removeTodo.type]: (state, action) => [...state.filter(todo => todo.id !== action.payload)]
});
