import { baseApi } from "../api/baseApi";

const rulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRules: builder.query({
      query: ({ type }) => {
        return {
          method: "GET",
          url: `/settings?key=${type}`,
        };
      },
    }),

    updateRules: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: "/settings",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetRulesQuery, useUpdateRulesMutation } = rulesApi;
