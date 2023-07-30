import { useState } from 'react';

import useTodoListStore from '../store/store.ts';

function TodoList() {
  const [state, setState] = useState('');
  const [search, setSearch] = useState('');

  const { searchTodoList, setSearchTodoList, todoList, removeTodo, changeTodo, setTodo } = useTodoListStore();

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
          <button className="button buttonAdd" onClick={() => setTodo(state)}>
            Добавить
          </button>
        </div>
        <div className="inputWrapper">
          <input className="input" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="button buttonAdd" onClick={() => setSearchTodoList(search)}>
            Поиск
          </button>
          <button className="button buttonAdd" onClick={() => setSearchTodoList(null)}>
            Reset
          </button>
        </div>
        <ul className="todoList">
          {(searchTodoList || todoList)?.map((todo) => (
            <li className="todoItem" key={todo.id}>
              <input type="checkbox" onChange={(e) => changeTodo({ ...todo, isDone: e.target.checked })} />
              <p className="todoText">{todo.text}</p>
              <button className="button buttonDelete" onClick={() => removeTodo(todo.id)}>
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
