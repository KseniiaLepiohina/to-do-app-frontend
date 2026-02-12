import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // додано /react для хуків

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: `/auth/signUp`,
        method: 'POST',
        body: credentials, 
      }),
    }),
    signIn: builder.mutation({ 
      query: (credentials) => ({
        url: `/auth/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;