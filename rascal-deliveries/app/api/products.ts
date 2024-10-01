import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import config from "../config"
import { prepareHeaders } from "../helpers/api"
import { Product } from "../types"

const { apiBase, apiUrl, apiVersion } = config

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}${apiBase}/${apiVersion}`,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
    }),
  }),
})

export const { useGetProductsQuery } = productsApi
