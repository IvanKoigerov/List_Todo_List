import { Provider } from 'react-redux';

import './App.css';
import TodoList from './components/TodoList.tsx';
import { setupStore } from './store/store.ts';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
