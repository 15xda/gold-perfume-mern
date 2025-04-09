import axios from "axios";

export const refreshUserInfo = async () => {
    
    try {
        const response = await axios.get('http://localhost:4004/refresh-token', {
            withCredentials: true,
        });

        return response.data;
        
    } catch (error) {
        throw error;
    }
};