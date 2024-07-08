import { axiosConfig } from "@/utils";

const getUser = async () => {
    try {
        const response = await axiosConfig.get('/auth/me');
        return response.data;
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return null;
    }
}

export default getUser;