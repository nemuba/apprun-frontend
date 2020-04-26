import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {addTodoAsync} from './actions'
import { Link } from 'react-router-dom';

const Todo = (props) => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({id: Math.random(100), name: ''});

  const handleChange = (e) =>{
    e.preventDefault();
    setTodo({ ...todo, [e.target.name]: e.target.value});
  }

  const handleAdd = (e) =>{
    e.preventDefault();
    dispatch(addTodoAsync(todo));
    setTodo({id: Math.random(100), name: ''});
  }


  return (
    <div>
      <Link to="/about">About</Link>
      <br/>
      <input name="id" type="hidden" value={todo.id} onChange={handleChange}/>
      <input name="name" value={todo.name} onChange={handleChange}/>
      <br/>
      <button onClick={handleAdd}>Add</button>
      <h1>Todos</h1>
      <ul>
        {todos.length ? todos.map(todo => (<li key={todo.id}>{todo.name}</li>)) : <p>Nenhum</p>}
      </ul>
    </div>
  );
};

export default Todo;
