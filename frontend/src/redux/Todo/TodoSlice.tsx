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

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => ({
                url: 'todo',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                }
            })
        }),
        createTodo: builder.mutation<Todo, Todo>({
            query: ({...body}) => ({
                url: 'todo',
                method: 'POST',
                data: body,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                }
            }),
            // The following code is used to update the cache when a new todo is created
            // or undo the changes if the request fails
            async onQueryStarted(todo, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
                        draft?.push(todo);
                    })
                );
                try{
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            }
        })
    }),
});

export const { addTodo, removeTodo } = todoSlice.actions;
export const { useGetTodosQuery, useCreateTodoMutation } = todoApi;
export default todoSlice.reducer;