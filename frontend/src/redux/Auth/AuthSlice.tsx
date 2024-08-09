import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createSlice } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage, setTokenInLocalStorage } from "../../utils/LocalStorageUtils";

export type AuthState = {
    isAuthenticated: boolean;
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: getTokenFromLocalStorage() ? true : false,
    },
    reducers: {
        login: (state, action) => {
            setTokenInLocalStorage(action.payload.token);
            state.isAuthenticated = true;
        },
        logout: (state) => {
            removeTokenFromLocalStorage();
            state.isAuthenticated = false;
        },
    }
});

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5299/api/auth'
    }),
    endpoints: (builder) => ({
        login: builder.mutation<{token: string | undefined}, string>({
            query: (token) => ({
                url: 'google',
                method: 'POST',
                body: JSON.stringify({token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
});

export const checkAuth = (state: {auth: AuthState}) => state.auth.isAuthenticated;

export const { login, logout } = authSlice.actions;
export const { useLoginMutation } = authApi;
export default authSlice.reducer;