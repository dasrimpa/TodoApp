import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../Interface/Todo.interface";

const initialState: any[] = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
];

const todoSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    addTodo: (state, { payload }: { payload: Todo }) => {
      state.push(payload);
      return state;
    },
    
    removeTodo: (state, { payload }: { payload: Todo }) => {
      return state.filter((todo) => todo.id !==payload);
    },

    updateTodo: (state, { payload }: { payload: Todo }) => {
      return state.map((todo) => {
        if (todo.id === payload.id) {
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

export const addTodoActions = todoSlice.actions;

export default todoSlice.reducer;