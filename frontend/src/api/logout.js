import { clearAccessToken } from "../storage/authSlice";
import { logout } from "../storage/userSlice";
import api from "./axiosInstance";
import { store } from "../storage/store";


export const logoutGlobal = async () => {
    try {

        await api.post('/logout')
        store.dispatch(clearAccessToken());
        store.dispatch(logout()); 
        window.location.replace(window.location.href);

        
    } catch (error) {
        console.error('Logout error:', error);
    }
};