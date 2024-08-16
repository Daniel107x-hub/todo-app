import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../client/customBaseQuery";
import {GOOGLE_AUTH_PATH} from "../../constants/constants";

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
        })
    })
});

export const { useLoginMutation } = authApi;