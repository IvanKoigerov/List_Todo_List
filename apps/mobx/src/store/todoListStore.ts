import { makeAutoObservable } from 'mobx';

interface TodoItem {
  id: number | string;
  text: string;
  isDone: boolean;
}

class TodoListStore {
  todoList: TodoItem[] | null = null;
  searchTodoList: TodoItem[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchTodoList = (search: string | null) => {
    if (!search || !this.todoList) {
      this.searchTodoList = null;
      return;
    }

    this.searchTodoList = this.todoList?.filter((todo: TodoItem) => todo.text.includes(search));
  };

  setTodo = (text: string) => {
    if (!this.todoList) {
      this.todoList = [
        {
          id: new Date().getTime(),
          text,
          isDone: false,
        },
      ];
      return;
    }

    this.todoList?.push({
      id: new Date().getTime(),
      text,
      isDone: false,
    });
  };

  removeTodo = (id: number | string) => {
    if (!this.todoList) return;

    this.todoList = this.todoList.filter((todo: TodoItem) => todo.id !== id);
  };

  changeTodo = (todoItem: TodoItem) => {
    if (!this.todoList) return;

    this.todoList = this.todoList.map((todo: TodoItem) => {
      if (todo.id === todoItem.id) return todoItem;
      return todo;
    });
  };
}

export default new TodoListStore();
