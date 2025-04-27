import axios from "axios";
import { store } from '../storage/store'; // Import the store
import { setAccessToken } from "../storage/authSlice";
import {refreshUserInfo} from './refreshUserInfo';
import { logoutGlobal } from "./logout";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
});

// 🔹 **Interceptor to Attach Access Token Automatically**
api.interceptors.request.use(
    async (config) => {
        const state = store.getState(); // ✅ Use store instead of useSelector
        const accessToken = state.auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 🔹 **Interceptor to Handle Expired Token & Refresh It**
api.interceptors.response.use(
    (response) => response, // ✅ If the response is OK, return it as is

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const freshInfo = await refreshUserInfo();
                const newAccessToken = freshInfo.accessToken; 

                store.dispatch(setAccessToken(newAccessToken));
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                logoutGlobal();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
