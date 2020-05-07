import {addTodo, removeTodo} from '../../store/ducks/Todo';
import {toast} from 'react-toastify';

export const addTodoAsync = (todo) =>{
  return dispatch =>{
    setTimeout(() => {
      dispatch(addTodo(todo));
      toast.success('Inserido com sucesso !');
    }, 500);
  }
}

export const removeTodoAsync = (id) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(removeTodo(id));
      toast.success("Removido com sucesso !");
    }, 500);
  };
};