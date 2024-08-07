import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Todo } from '../../types/Todo'
import {TODOS} from "../../pages/Todo/Todo.data";

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
    }
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;