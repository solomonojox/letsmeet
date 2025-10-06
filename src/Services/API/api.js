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
      query: () => "/api/User/Query",
    }),
    getUserById: builder.query({
      query: (userId) => `/api/User/Get/${userId}`,
    }),
    getAllReports: builder.query({
      query: () => ({
        url: `/api/Report/GetDetailed`,
      }),
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
      query: () => ({
        url: `/api/SubscriptionAnalytics/subscriptions`,
      }),
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
    getAllFeedbacks: builder.query({
      query: () => ({
        url: `/api/Feedback/Query`,
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
  useGetAllFeedbacksQuery,
} = api;