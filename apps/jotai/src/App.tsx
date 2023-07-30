import { Provider } from 'jotai';

import './App.css';
import TodoList from './components/TodoList.tsx';

function App() {
  return (
    <Provider>
      <TodoList />
    </Provider>
  );
}

export default App;
