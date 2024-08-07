import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Todo } from '../../types/Todo'
import {TODOS} from "../../pages/Todo/Todo.data";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export type TodoState = {
    todos: Todo[];
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: TODOS
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

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5299/api/todo'
    }),
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => ''
        }),
    }),
});

export const { addTodo, removeTodo } = todoSlice.actions;
export const { useGetTodosQuery } = todoApi;
export default todoSlice.reducer;