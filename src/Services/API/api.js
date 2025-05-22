import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("letsmeetUserId");

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    keepUnusedDataFor: 60000,
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => "/api/User/GetAllUser",
        }),
        getUserById: builder.query({
            query: (userId) => `/api/User/GetUserById/${userId}`,
        }),
        getAllReports: builder.query({
            query: () => ({
                url: `/api/ReportUser/GetAllReports`,
            }),
        }),
        getActiveUsersPerMonth: builder.query({
            query: () => ({
                url: `/api/User/ActiveUsersPerMonth/12`,
            }),
        }),
        getTotalRevenue: builder.query({
            query: () => ({
                url: `/api/Subscription/TotalRevenue`,
            }),
        }),
        getTotalSubscribers: builder.query({
            query: () => ({
                url: `/api/Subscription/TotalSubscriptions`,
            }),
        }),
        getSubscribers: builder.query({
            query: () => ({
                url: `/api/Subscription/GetAllSubscribers`,
            }),
        }),
        getPurchasedTicketByEventIdAndUserId: builder.query({
            query: (eventId) => ({
                url: `/api/purchasedTicket/getPurchasedTicketByEventAndUserId/${eventId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
} = api