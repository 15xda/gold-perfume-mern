import { clearAccessToken } from "../storage/authSlice";
import { logout } from "../storage/userSlice";
import api from "./axiosInstance";
import { store } from "../storage/store";


export const logoutGlobal = async () => {
    try {

        await api.post('/auth/logout')
        store.dispatch(clearAccessToken());
        store.dispatch(logout()); 

    } catch (error) {
        console.error('Logout error:', error);
    }
};