import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

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

export const { useLoginMutation } = authApi;