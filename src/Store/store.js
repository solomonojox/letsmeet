import { configureStore } from "@reduxjs/toolkit";
import { api } from "../Services/API/api";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store