import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../Services/baseUrl";
const BASE_URL = baseUrl;

const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const { userDetails: user, token } = useSelector((state) => state?.user);

    const baseUrl = `${BASE_URL}hubs/chat`;

    const refreshNotifications = () => {
        console.log("🔄 Refreshing notifications...");
    };

    return (
        <AppContext.Provider value={{ user, token, baseUrl, refreshNotifications }}>
            {children}
        </AppContext.Provider>
    );
};