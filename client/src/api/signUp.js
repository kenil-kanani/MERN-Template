import { axiosConfig } from "@/utils";

const signUp = async (email, password, name, role) => {
    try {
        const response = await axiosConfig.post('/auth/signup', {
            email,
            password,
            name,
            role
        });
        return response.data;
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return null;
    }
}

export default signUp;