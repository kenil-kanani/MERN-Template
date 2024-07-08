import { signIn } from "@/api";
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const signInUser = async (email, password) => {
        const res = await signIn(email, password);
        if (res && res.data) {
            setUser({
                name: res.data.name,
                email: res.data.email,
            })
            setRole(res.data.role);
        } else {
            setUser(null);
            setRole(null);
        }
        setIsLoading(false);
    }

    const value = {
        user,
        role,
        isLoading,
        signInUser
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
export { AppProvider };