import {combineReducers, configureStore, Store} from "@reduxjs/toolkit";
import todoReducer, { TodoState } from "./Todo/TodoSlice";

interface AppState {
    todo: TodoState
}

const rootReducer = combineReducers({
    todo: todoReducer
});

const configureAppStore = () : Store<AppState> => {
    return configureStore({
        reducer: rootReducer
    });
};

export default configureAppStore;