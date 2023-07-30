import { useStore } from 'effector-react';
import { useState } from 'react';

import './App.css';
import { TodoList } from './store/effector.ts';

const { store, event } = TodoList;

function App() {
  const [state, setState] = useState('');
  const [search, setSearch] = useState('');

  const todoList = useStore(store.$todoList);
  const searchTodoList = useStore(store.$searchTodoList);

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
          <button className="button buttonAdd" onClick={() => event.createTodo(state)}>
            Добавить
          </button>
        </div>
        <div className="inputWrapper">
          <input className="input" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="button buttonAdd" onClick={() => event.searchTodo(search)}>
            Поиск
          </button>
          <button className="button buttonAdd" onClick={() => event.resetSearchTodo()}>
            Reset
          </button>
        </div>
        <ul className="todoList">
          {(searchTodoList || todoList)?.map((todo) => (
            <li className="todoItem" key={todo.id}>
              <input type="checkbox" onChange={(e) => event.editTodo({ ...todo, isDone: e.target.checked })} />
              <p className="todoText">{todo.text}</p>
              <button className="button buttonDelete" onClick={() => event.deleteTodo(todo.id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
