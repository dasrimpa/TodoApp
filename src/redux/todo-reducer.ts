import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../Interface/Todo.interface";

const initialState = {
  todoList: [] as Todo[],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,

  reducers: {
    listUpdate: (state, { payload } : { payload: Todo[] }) => {
      state.todoList = payload;
    },
    addTodo: (state, { payload }: { payload: Todo }) => {
      state.todoList.push(payload);
      return state;
    },
    
    removeTodo: (state, { payload } : { payload: Todo }) => {
      state.todoList = state.todoList.filter((todo) => todo.objectId !== payload.objectId);
    },

    updateTodo: (state, { payload }: { payload: Todo }) => {
      state.todoList = state.todoList.map((todo) => {
        if (todo.objectId === payload.objectId) {
          return {
            ...todo,
            ...payload
          };
        }
        return todo;
      });
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;