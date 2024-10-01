import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import config from "../config"
import { prepareHeaders } from "../helpers/api"
import { User } from "../types"

const { apiBase, apiUrl, apiVersion } = config

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}${apiBase}/${apiVersion}`,
    prepareHeaders,
  }),
  tagTypes: ["USERS"],
  endpoints: (builder) => ({
    getUser: builder.query<User, User>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),
    createUser: builder.mutation<User, void>({
      query: () => ({
        url: `/users`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["USERS"],
    }),
  }),
})

export const { useLazyGetUserQuery, useCreateUserMutation } = usersApi
