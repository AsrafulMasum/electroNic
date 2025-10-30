import { baseApi } from "../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersList: builder.query({
      query: ({ limit, page, searchTerm }) => {
        return {
          method: "GET",
          url: `/orders/admin-orders-transaction?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
        };
      },
    }),
  }),
});

export const { useGetOrdersListQuery } = bookingsApi;
