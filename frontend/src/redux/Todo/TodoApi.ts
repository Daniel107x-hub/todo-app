import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../client/customBaseQuery";
import {Todo} from "../../types/Todo";
import {getTokenFromLocalStorage} from "../../utils/LocalStorageUtils";

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => ({
                url: 'todo',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                }
            }),
            providesTags: (result) => result
                ? // Successfully fetched data
                [
                    ...result.map(({id}) => ({type: 'Todo', id} as const)),
                    { type: 'Todo', id: 'LIST' }
                ]
                :
                [{type: 'Todo', id: 'LIST'}]
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
            invalidatesTags: [{type: 'Todo', id: 'LIST'}],
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

export const { useGetTodosQuery, useCreateTodoMutation } = todoApi;