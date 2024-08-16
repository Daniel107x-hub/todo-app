import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../client/customBaseQuery";

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

export const { useLoginMutation } = authApi;