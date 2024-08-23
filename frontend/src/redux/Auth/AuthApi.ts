import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../client/customBaseQuery";
import {GOOGLE_AUTH_PATH, USER_PATH} from "../../constants/constants";
import {User} from "../../types/Todo";
import {getTokenFromLocalStorage} from "../../utils/LocalStorageUtils";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<{token: string | undefined}, string>({
            query: (token) => ({
                url: GOOGLE_AUTH_PATH,
                method: 'POST',
                data: JSON.stringify({token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        getUser: builder.query<User, void>({
            query: () => ({
                url: USER_PATH,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                }
            }),
            keepUnusedDataFor: 10
        })
    })
});

export const { useLoginMutation, useGetUserQuery } = authApi;