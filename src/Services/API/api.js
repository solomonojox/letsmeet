import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    // 🔑 Attach token to every request
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("letsmeetToken"); // get token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // you can set other headers here if needed:
      // headers.set('Content-Type', 'application/json')
      return headers;
    },
  }),
  keepUnusedDataFor: 60000,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.PageNumber !== undefined) queryParams.append("PageNumber", params.PageNumber.toString());
        if (params.PageSize !== undefined) queryParams.append("PageSize", params.PageSize.toString());

        return {
          url: `/api/User/Get?${queryParams.toString()}`,
          method: "GET",
        };
      }
    }),
    getUserById: builder.query({
      query: (userId) => `/api/User/Get/${userId}`,
    }),
    getAllReports: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.PageNumber !== undefined) queryParams.append("pageNumber", params.PageNumber.toString());
        if (params.PageSize !== undefined) queryParams.append("pageSize", params.PageSize.toString());

        return {
          url: `/api/Report/GetDetailed?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    getActiveUsersPerMonth: builder.query({
      query: () => ({
        url: `/api/admin/UserAnalytics/registrations?groupBy=day`,
      }),
    }),
    getTotalRevenue: builder.query({
      query: () => ({
        url: `/api/Subscription/TotalRevenue`,
      }),
    }),

    getTotalSubscribers: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.pageNumber !== undefined) queryParams.append("pageNumber", params.pageNumber.toString());
        if (params.pageSize !== undefined) queryParams.append("pageSize", params.pageSize.toString());

        return {
          url: `/api/SubscriptionAnalytics/subscriptions?${queryParams.toString()}`,
          method: "GET",
        };
      }
    }),

    getSubscribers: builder.query({
      query: () => ({
        // url: `/api/SubscriptionAnalytics/subscriptions`,
        url: `/api/SubscriptionAnalytics/status-breakdown`,
      }),
    }),

    getSubscriptionStat: builder.query({
      query: () => ({
        url: `/api/SubscriptionAnalytics/overview`,
      }),
    }),

    getFriendRequestStat: builder.query({
      query: () => ({
        url: `/api/v1/chat/friend-requests/sent`,
      }),
    }),

    getAllFriendRequestsReceived: builder.query({
      query: () => ({
        url: `/api/v1/chat/friend-requests/received`,
      }),
    }),

    getAllFriendRequestsSent: builder.query({
      query: () => ({
        url: `/api/v1/chat/friend-requests/sent`,
      }),
    }),

    getFriendRequestFullStat: builder.query({
      query: () => ({
        url: `/api/admin/chat-contact-analytics/friend-requests/conversion-rate`,
      }),
    }),

    getFriendRequestMothlyRate: builder.query({
      query: () => ({
        url: `/api/admin/chat-contact-analytics/friend-requests/monthly?months=1`,
      }),
    }),

    getAllFeedbacks: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.PageNumber !== undefined) queryParams.append("PageNumber", params.PageNumber.toString());
        if (params.PageSize !== undefined) queryParams.append("PageSize", params.PageSize.toString());

        return {
          url: `/api/Feedback/Get?${queryParams.toString()}`,
          method: "GET",
        };
      }
    }),

    // Referrals
    getAllPartners: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.PageNumber !== undefined) queryParams.append("PageNumber", params.PageNumber.toString());
        if (params.PageSize !== undefined) queryParams.append("PageSize", params.PageSize.toString());

        return {
          url: `/api/admin/referral-partners?${queryParams.toString()}`,
          method: "GET",
        };
      }
    }),

    getReferrersCardData: builder.query({
      query: () => ({
        url: `/api/admin/referral-partners/dashboard/overview`,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetAllReportsQuery,
  useGetActiveUsersPerMonthQuery,
  useGetTotalRevenueQuery,
  useGetTotalSubscribersQuery,
  useGetSubscribersQuery,
  useGetSubscriptionStatQuery,
  useGetFriendRequestStatQuery,
  useGetAllFriendRequestsReceivedQuery,
  useGetAllFriendRequestsSentQuery,
  useGetFriendRequestFullStatQuery,
  useGetFriendRequestMothlyRateQuery,
  useGetAllFeedbacksQuery,

  // Referrals
  useGetAllPartnersQuery,
  useGetReferrersCardDataQuery,
} = api;