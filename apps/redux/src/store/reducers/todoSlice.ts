import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TodoItem {
  id: number | string;
  text: string;
  isDone: boolean;
}

export interface TodoState {
  todoList: TodoItem[] | null;
  searchTodoList: TodoItem[] | null;
  error: unknown;
}

const initialState: TodoState = {
  todoList: [],
  error: null,
  searchTodoList: null,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<string>) => {
      if (!state.todoList) {
        state.todoList = [
          {
            id: new Date().getTime(),
            text: action.payload,
            isDone: false,
          },
        ];
      }

      state.todoList.push({
        id: new Date().getTime(),
        text: action.payload,
        isDone: false,
      });
    },

    changeTodo: (state, action: PayloadAction<TodoItem>) => {
      if (!state.todoList) return;

      state.todoList = state.todoList.map((todo) => {
        if (todo.id === action.payload.id) return action.payload;
        return todo;
      });
    },

    removeTodo: (state, action: PayloadAction<string | number>) => {
      if (!state.todoList) return;

      state.todoList = state.todoList.filter((todo: TodoItem) => todo.id !== action.payload);
    },

    setSearchTodoList: (state, action: PayloadAction<string | null>) => {
      if (!action.payload || !state.todoList) {
        state.searchTodoList = null;
        return;
      }

      state.searchTodoList =
        state.todoList?.filter((todo: TodoItem) => todo.text.includes(action.payload as string)) || null;
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
