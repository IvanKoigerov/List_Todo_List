import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { todoActions } from '../store/reducers/todoSlice.ts';

function TodoList() {
  const [state, setState] = useState('');
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();

  const searchTodoList = useAppSelector((state) => state.todoReducer.searchTodoList);
  const todoList = useAppSelector((state) => state.todoReducer.todoList);

  return (
    <div className="container">
      <div className="todoWrapper">
        <div className="inputWrapper">
          <input
            className="input"
            placeholder="Введите название"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <button className="button buttonAdd" onClick={() => dispatch(todoActions.setTodo(state))}>
            Добавить
          </button>
        </div>
        <div className="inputWrapper">
          <input className="input" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="button buttonAdd" onClick={() => dispatch(todoActions.setSearchTodoList(search))}>
            Поиск
          </button>
          <button className="button buttonAdd" onClick={() => dispatch(todoActions.setSearchTodoList(null))}>
            Reset
          </button>
        </div>
        <ul className="todoList">
          {(searchTodoList || todoList)?.map((todo) => (
            <li className="todoItem" key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={(e) => dispatch(todoActions.changeTodo({ ...todo, isDone: e.target.checked }))}
              />
              <p className="todoText">{todo.text}</p>
              <button className="button buttonDelete" onClick={() => dispatch(todoActions.removeTodo(todo.id))}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
