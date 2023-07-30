import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface TodoItem {
  id: number | string;
  text: string;
  isDone: boolean;
}

interface TodoListStore {
  todoList: TodoItem[] | null;
  searchTodoList: TodoItem[] | null;
  setSearchTodoList: (search: string | null) => void;
  setTodo: (text: string) => void;
  removeTodo: (id: number | string) => void;
  changeTodo: (todoItem: TodoItem) => void;
}

const useTodoListStore = create<TodoListStore>()(
  immer((set) => ({
    todoList: null,

    setTodo: (text: string) =>
      set((state) => {
        if (!state.todoList) {
          return {
            todoList: [
              {
                id: new Date().getTime(),
                text,
                isDone: false,
              },
            ],
          };
        }

        state.todoList?.push({
          id: new Date().getTime(),
          text,
          isDone: false,
        });
      }),

    changeTodo: (todoItem: TodoItem) =>
      set((state) => {
        if (!state.todoList) return;

        return {
          todoList: state.todoList.map((todo: TodoItem) => {
            if (todo.id === todoItem.id) return todoItem;
            return todo;
          }),
        };
      }),

    removeTodo: (id: string | number) =>
      set((state) => {
        if (!state.todoList) return;

        return {
          todoList: state.todoList.filter((todo: TodoItem) => todo.id !== id),
        };
      }),

    searchTodoList: null,
    setSearchTodoList: (search: string | null) =>
      set((state) => {
        if (!search || !state.todoList) {
          return {
            searchTodoList: null,
          };
        }

        return {
          searchTodoList: state.todoList.filter((todo: TodoItem) => todo.text.includes(search)),
        };
      }),
  })),
);

export default useTodoListStore;

export const useSelectorTodoList = () => useTodoListStore((state) => state.todoList);
export const useSelectorSearchTodoList = () => useTodoListStore((state) => state.searchTodoList);
export const useSelectorChangeTodo = () => useTodoListStore((state) => state.changeTodo);
export const useSelectorRemoveTodo = () => useTodoListStore((state) => state.removeTodo);
export const useSelectorSetTodo = () => useTodoListStore((state) => state.setTodo);
export const useSelectorSetSearchTodoList = () => useTodoListStore((state) => state.setSearchTodoList);
