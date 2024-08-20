import {combineReducers, configureStore, Reducer, Store} from "@reduxjs/toolkit";
import authReducer, {AuthState} from "./Auth/AuthSlice";
import {todoApi} from "./Todo/TodoApi";
import {authApi} from "./Auth/AuthApi";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
interface AppState {
    auth: AuthState
}

const rootReducer : Reducer = combineReducers({
    auth: authReducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [authApi.reducerPath]: authApi.reducer
});

const persistConfig = {
    key: 'app', // root causes conflict so set this name to something else
    storage
}

const persistedReducer : Reducer = persistReducer(persistConfig, rootReducer);

const configureAppStore = (reducer: Reducer = rootReducer) : Store<AppState> => {
    return configureStore({
        reducer: reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }}).concat(todoApi.middleware).concat(authApi.middleware)
    });
};

const store = configureAppStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };