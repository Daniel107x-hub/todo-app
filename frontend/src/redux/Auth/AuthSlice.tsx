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

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;