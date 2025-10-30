import { baseApi } from "../api/baseApi";

const offersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/banners",
        };
      },
    }),

    createOffer: builder.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/banners",
          body: payload,
        };
      },
    }),

    updateOffer: builder.mutation({
      query: ({ id, formData }) => {
        return {
          method: "PATCH",
          url: `/banners/${id}`,
          body: formData,
        };
      },
    }),

    deleteOffer: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/banners/${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetOffersQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = offersApi;
