import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
export const refreshUserInfo = async () => {
    
    try {
        const response = await axios.get(`${apiUrl}/auth/refresh-token`, {
            withCredentials: true,
        });

        return response.data;
        
    } catch (error) {
        throw error;
    }
};