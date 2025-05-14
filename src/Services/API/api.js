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
        getEventById: builder.query({
            query: (eventId) => `/api/event/getEventById/${eventId}`,
        }),
        getEventByCreatorId: builder.query({
            query: (userId) => `/api/event/getEventsByCreatorId/${userId}`,
        }),
        getEventByAttendeeId: builder.query({
            query: (userId) => `/api/event/getEventByAttendeeId/${userId}`,
        }),
        getUserById: builder.query({
            query: (userId) => `/api/User/getUserById/${userId}`,
        }),
        getDashboardSummary: builder.query({
            query: () => ({
                url: `/api/User/dashboard/summary`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        getDashboardSales: builder.query({
            query: () => ({
                url: `/api/User/sales/yearly-insights`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        getDashboardEventCreatedStat: builder.query({
            query: () => ({
                url: `/api/User/event/createdStat`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        getDashboardSummaryAttendee: builder.query({
            query: () => ({
                url: `/api/User/attendee/dashboard/summary`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        getDashboardEventAttendedStat: builder.query({
            query: () => ({
                url: `/api/User/event/attendedStat`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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

export const { useGetAllUsersQuery, } = api