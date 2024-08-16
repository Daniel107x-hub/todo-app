import {combineReducers, configureStore, Store} from "@reduxjs/toolkit";
import todoReducer, {TodoState} from "./Todo/TodoSlice";
import authReducer, {AuthState} from "./Auth/AuthSlice";
import {todoApi} from "./Todo/TodoApi";
import {authApi} from "./Auth/AuthApi";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
interface AppState {
    todo: TodoState,
    auth: AuthState
}

const rootReducer = combineReducers({
    todo: todoReducer,
    auth: authReducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [authApi.reducerPath]: authApi.reducer
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureAppStore = () : Store<AppState> => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(todoApi.middleware).concat(authApi.middleware)
    });
};

const persistedStore = () => {
    const store = configureAppStore();
    const persistor = persistStore(store);
    return { store, persistor };
}

export { configureAppStore, persistedStore };