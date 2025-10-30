import { baseApi } from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ searchTerm, page, limit }) => {
        return {
          method: "GET",
          url: `/products/get-all-for-admin?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
} = productApi;
