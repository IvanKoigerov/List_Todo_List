import { atom, useAtom, useSetAtom } from 'jotai';

interface TodoItem {
  id: number | string;
  text: string;
  isDone: boolean;
}

const todoListAtom = atom<TodoItem[] | null>(null);

const addTodoAtom = atom(
  (get) => get(todoListAtom),
  (get, set, args: string) =>
    set(todoListAtom, [...(get(todoListAtom) || []), { id: new Date().getTime(), text: args, isDone: false }]),
);

const removeAtom = atom(null, (get, set, id: string | number) =>
  set(todoListAtom, [...(get(todoListAtom) || []).filter((todo) => todo.id !== id)]),
);

const changeAtom = atom(null, (get, set, todoItem: TodoItem) =>
  set(todoListAtom, [...(get(todoListAtom) || []).filter((todo) => todo.id !== todoItem.id), todoItem]),
);

const searchAtom = atom<TodoItem[] | null>(null);

const searchTodoListAtom = atom(
  (get) => get(searchAtom),
  (get, set, search: string | null) =>
    set(searchAtom, search !== null ? (get(todoListAtom) || []).filter((todo) => todo.text.includes(search)) : search),
);

const useTodo = () => {
  const removeTodo = useSetAtom(removeAtom);
  const changeTodo = useSetAtom(changeAtom);
  const [searchTodoList, setSearchTodoList] = useAtom(searchTodoListAtom);
  const [todoList, setTodoList] = useAtom(addTodoAtom);

  return {
    todoListAtom: {
      todoList,
      setTodoList,
      removeTodo,
      changeTodo,
    },
    searchTodoListAtom: {
      searchTodoList,
      setSearchTodoList,
    },
  };
};

export default useTodo;
