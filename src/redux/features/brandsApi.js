import { baseApi } from "../api/baseApi";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: ({ searchTerm, page }) => {
        return {
          method: "GET",
          url: `/brands/all-for-admin?searchTerm=${searchTerm}&page=${page}`,
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
      query: ({ id, formData }) => {
        return {
          method: "PATCH",
          url: `/brands/${id}`,
          body: formData,
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
