import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import config from "../config"
import { prepareHeaders } from "../helpers/api"
import { Delivery } from "../types"

const { apiBase, apiUrl, apiVersion } = config

export const deliveriesApi = createApi({
  reducerPath: "deliveries",
  tagTypes: ["DELIVERIES"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}${apiBase}/${apiVersion}`,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getDeliveries: builder.query<Delivery[], void>({
      query: () => ({
        url: `/deliveries`,
        method: "GET",
        providesTags: ["DELIVERIES"],
        cache: "no-cache",
      }),
    }),
    createDelivery: builder.mutation<Delivery, Omit<Delivery, "id">>({
      query: (body) => ({
        url: `/deliveries`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["DELIVERIES"],
    }),
  }),
})

export const { useGetDeliveriesQuery, useCreateDeliveryMutation } =
  deliveriesApi
