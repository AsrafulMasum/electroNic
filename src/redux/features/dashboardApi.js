import { baseApi } from "../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/admin-analytics",
        };
      },
    }),

    getEarnings: builder.query({
      query: ({ year }) => {
        return {
          method: "GET",
          url: `/dashboard/admin-orders-statistic?year=${year}`,
        };
      },
    }),

    getOrders: builder.query({
      query: ({ year }) => {
        return {
          method: "GET",
          url: `/dashboard/admin-monthly-orders-status?year=${year}`,
        };
      },
    }),

    getCustomersStatistic: builder.query({
      query: ({ year }) => {
        return {
          method: "GET",
          url: `/dashboard/admin-customer-yearly-statistic?year=${year}`,
        };
      },
    }),

    getSellersStatistic: builder.query({
      query: ({ year }) => {
        return {
          method: "GET",
          url: `/dashboard/admin-seller-monthly-onboarding?year=${year}`,
        };
      },
    }),

    getTopSellingProducts: builder.query({
      query: ({ month }) => {
        return {
          method: "GET",
          url: `/dashboard/admin-top-selling-products?month=${month}`,
        };
      },
    }),

    getTopSellers: builder.query({
      query: ({ month }) => {
        return {
          method: "GET",
          url: `/dashboard/admin-top-sellers?month=${month}`,
        };
      },
    }),

    getRatings: builder.query({
      query: ({ month }) => {
        return {
          method: "GET",
          url: `/dashboard/admin-ratings-statistic?month=${month}`,
        };
      },
    }),
  }),
});

export const {
  useGetAnalyticsQuery,
  useGetEarningsQuery,
  useGetOrdersQuery,
  useGetTopSellingProductsQuery,
  useGetCustomersStatisticQuery,
  useGetRatingsQuery,
  useGetTopSellersQuery,
  useGetSellersStatisticQuery,
} = dashboardApi;
