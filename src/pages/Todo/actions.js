import {addTodo} from './../../store/ducks/Todo';

export const addTodoAsync = (todo) =>{
  return dispatch =>{
    setTimeout(() => {
      dispatch(addTodo(todo));
    }, 500);
  }
}