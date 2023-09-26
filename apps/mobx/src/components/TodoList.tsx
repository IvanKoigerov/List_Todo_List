import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import todoList from '../store/todoListStore.ts';

function TodoList() {
  const [state, setState] = useState('');
  const [search, setSearch] = useState('');

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
          <button className="button buttonAdd" onClick={() => todoList.setTodo(state)}>
            Добавить
          </button>
        </div>
        <div className="inputWrapper">
          <input className="input" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="button buttonAdd" onClick={() => todoList.setSearchTodoList(search)}>
            Поиск
          </button>
          <button className="button buttonAdd" onClick={() => todoList.setSearchTodoList(null)}>
            Reset
          </button>
        </div>
        <ul className="todoList">
          {(todoList.searchTodoList || todoList.todoList)?.map((todo) => (
            <li className="todoItem" key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={(e) => todoList.changeTodo({ ...todo, isDone: e.target.checked })}
              />
              <p className="todoText">{todo.text}</p>
              <button className="button buttonDelete" onClick={() => todoList.removeTodo(todo.id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default observer(TodoList);
