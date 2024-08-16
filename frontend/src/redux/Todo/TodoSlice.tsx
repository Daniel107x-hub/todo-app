import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Todo } from '../../types/Todo'
import {TODOS} from "../../pages/Todo/Todo.data";
import {createApi } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../../utils/LocalStorageUtils";
import axiosBaseQuery from "../../client/customBaseQuery";

export type TodoState = {
    loading: boolean;
    todos: Todo[];
    error: string | null;
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        loading: false,
        todos: TODOS,
        error: null
    },
    reducers: {
        addTodo: (state: TodoState, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state: TodoState, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        }
    },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;