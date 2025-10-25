import { baseApi } from "../api/baseApi";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/brands/all-for-admin",
        };
      },
    }),

    createBrand: builder.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/brands/create",
          body: payload,
        };
      },
    }),

    updateBrand: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: `/brands/${data.id}`,
          body: data?.body,
        };
      },
    }),

    deleteBrand: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/brands/${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
