import {combineReducers} from 'redux';
import todoReducer from './ducks/Todo';

const rootReducer = combineReducers({
  todos: todoReducer
})

export default rootReducer;