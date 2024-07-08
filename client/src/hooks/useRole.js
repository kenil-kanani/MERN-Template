
import AppContext from "@/context/AppContext";
import { useContext } from "react";

const useRole = (allowedRoles) => {
    const { user, role } = useContext(AppContext);
    if (!user || !role || !allowedRoles.includes(role)) {
        return false;
    }
    return true;
};

export default useRole;