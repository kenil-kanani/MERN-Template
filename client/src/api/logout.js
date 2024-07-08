import { axiosConfig } from "@/utils";

const logout = async () => {
    try {
        await axiosConfig.post('/auth/logout');
    } catch (error) {
        console.log(error);
    }
}

export default logout;