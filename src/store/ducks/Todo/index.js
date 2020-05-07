import { createReducer, createAction } from '@reduxjs/toolkit';

//initial state
const INITIAL_STATE = []

// actions creators
export const addTodo = createAction('ADD_TODO'); //return {type: 'ADD_TODO', payload: todo}
export const removeTodo = createAction("REMOVE_TODO"); //return {type: 'REMOVE_TODO', payload: id}

// reducer
export default createReducer(INITIAL_STATE,{
  [addTodo]: (state, action) => [...state, action.payload],
  [removeTodo]: (state, action) => [...state.filter(todo => todo.id !== action.payload)]
});
