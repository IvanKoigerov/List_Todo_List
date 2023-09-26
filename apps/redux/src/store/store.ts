import { combineReducers, configureStore } from '@reduxjs/toolkit';

import todoReducer from './reducers/todoSlice.ts';

const rootReducer = combineReducers({
  todoReducer,
});

export const setupStore = () => {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
  });
};

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
