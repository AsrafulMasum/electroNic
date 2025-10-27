import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellers: builder.query({
      query: ({ searchText, page }) => {
        return {
          url: `/user-managements/seller?searchTerm=${searchText}&page=${page}`,
          method: "GET",
        };
      },
    }),

    getCustomers: builder.query({
      query: ({ srcText, page }) => {
        return {
          url: `/user-managements?searchTerm=${srcText}&page=${page}`,
          method: "GET",
        };
      },
    }),

    lockUser: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/user/${id}`,
          method: "PATCH",
        };
      },
    }),

    getAdmin: builder.query({
      query: ({ searchTerm, page }) => {
        return {
          url: `/admins/get-admin?searchTerm=${searchTerm}&page=${page}`,
          method: "GET",
        };
      },
    }),

    addAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/admins/create-admin",
          method: "POST",
          body: data,
        };
      },
    }),

    deleteAdmin: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/admins/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useGetSellersQuery,
  useGetCustomersQuery,
  useGetAdminQuery,
  useLockUserMutation,
  useAddAdminMutation,
  useDeleteAdminMutation,
} = usersApi;
