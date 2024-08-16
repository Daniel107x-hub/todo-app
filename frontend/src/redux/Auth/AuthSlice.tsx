import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../client/customBaseQuery";
import {User} from "../../types/Todo";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AuthState = {
    user: User | null;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null
    },
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        removeUser: (state: AuthState) => {
            state.user = null;
        }
    }
})


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<{token: string | undefined}, string>({
            query: (token) => ({
                url: 'auth/google',
                method: 'POST',
                data: JSON.stringify({token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
});

export const { setUser, removeUser } = authSlice.actions;
export const { useLoginMutation } = authApi;
export default authSlice.reducer;