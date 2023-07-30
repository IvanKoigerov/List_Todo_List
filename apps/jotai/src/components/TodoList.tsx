import { useState } from 'react';

import useTodo from '../store/useTodo.ts';

function TodoList() {
  const [state, setState] = useState('');
  const [search, setSearch] = useState('');

  const { todoListAtom, searchTodoListAtom } = useTodo();

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
          <button className="button buttonAdd" onClick={() => todoListAtom.setTodoList(state)}>
            Добавить
          </button>
        </div>
        <div className="inputWrapper">
          <input className="input" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="button buttonAdd" onClick={() => searchTodoListAtom.setSearchTodoList(search)}>
            Поиск
          </button>
          <button className="button buttonAdd" onClick={() => searchTodoListAtom.setSearchTodoList(null)}>
            Reset
          </button>
        </div>
        <ul className="todoList">
          {(searchTodoListAtom.searchTodoList || todoListAtom.todoList)?.map((todo) => (
            <li className="todoItem" key={todo.id}>
              <input type="checkbox" onChange={(e) => todoListAtom.changeTodo({ ...todo, isDone: e.target.checked })} />
              <p className="todoText">{todo.text}</p>
              <button className="button buttonDelete" onClick={() => todoListAtom.removeTodo(todo.id)}>
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
