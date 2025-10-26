import { baseApi } from "../api/baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFAQ: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/faqs",
        };
      },
    }),

    createFAQ: builder.mutation({
      query: (faq) => ({
        method: "POST",
        url: "/faqs",
        body: faq,
      }),
    }),

    updateFAQ: builder.mutation({
      query: ({ id, faq }) => ({
        method: "PATCH",
        url: `/faqs/${id}`,
        body: faq,
      }),
    }),

    deleteFAQ: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/faqs/${id}`,
      }),
    }),
  }),
});

export const {
  useGetFAQQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;
