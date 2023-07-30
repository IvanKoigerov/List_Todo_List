import { createDomain } from 'effector';

interface TodoItem {
  id: number | string;
  text: string;
  isDone: boolean;
}

const todoListDomain = createDomain('todoList');

const $todoList = todoListDomain.createStore<TodoItem[] | null>(null);
const $searchTodoList = todoListDomain.createStore<TodoItem[] | null>(null);

const createTodo = todoListDomain.createEvent<string>();
const deleteTodo = todoListDomain.createEvent<number | string>();
const editTodo = todoListDomain.createEvent<TodoItem>();

const searchTodo = todoListDomain.createEvent<string>();
const resetSearchTodo = todoListDomain.createEvent();

const search = (todoList: TodoItem[] | null, text: string) => {
  return todoList?.filter((todo) => todo.text.includes(text));
};

const addItem = (todoList: TodoItem[] | null, data: string): TodoItem[] => {
  const todo = {
    id: new Date().getTime(),
    text: data,
    isDone: false,
  };

  return todoList ? [...todoList, todo] : [todo];
};

$todoList.on(createTodo, (todoList, data) => addItem(todoList, data));
$todoList.on(deleteTodo, (todoList, data) => todoList?.filter((todo) => todo.id !== data));
$todoList.on(editTodo, (todoList, data) => [...(todoList?.filter((todo) => todo.id !== data.id) ?? []), data]);

$searchTodoList.on(searchTodo, (_, data) => search($todoList.getState(), data)).reset(resetSearchTodo);

export const TodoList = {
  store: {
    $todoList,
    $searchTodoList,
  },
  event: {
    createTodo,
    deleteTodo,
    editTodo,
    searchTodo,
    resetSearchTodo,
  },
};
