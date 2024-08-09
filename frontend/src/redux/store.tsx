import {combineReducers, configureStore, Store} from "@reduxjs/toolkit";
import todoReducer, {todoApi, TodoState} from "./Todo/TodoSlice";
import { authApi } from "./Auth/AuthSlice";

interface AppState {
    todo: TodoState
}

const rootReducer = combineReducers({
    todo: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [authApi.reducerPath]: authApi.reducer
});

const configureAppStore = () : Store<AppState> => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware).concat(authApi.middleware)
    });
};

export default configureAppStore;