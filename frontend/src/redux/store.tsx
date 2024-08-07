import {combineReducers, configureStore, Store} from "@reduxjs/toolkit";
import todoReducer, {todoApi, TodoState} from "./Todo/TodoSlice";

interface AppState {
    todo: TodoState
}

const rootReducer = combineReducers({
    todo: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer
});

const configureAppStore = () : Store<AppState> => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware)
    });
};

export default configureAppStore;