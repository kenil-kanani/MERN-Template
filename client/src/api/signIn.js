import { axiosConfig } from "@/utils";

const signIn = async (email, password) => {
    try {
        const response = await axiosConfig.post('/auth/signin', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return null;
    }
}

export default signIn;