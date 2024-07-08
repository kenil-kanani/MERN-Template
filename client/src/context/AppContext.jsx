import { signIn } from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast()

    const signInUser = async (email, password) => {
        const res = await signIn(email, password);
        if (res && res.data) {
            setUser({
                name: res.data.name,
                email: res.data.email,
            })
            setRole(res.data.role);
            toast({
                title: "Successfully logged in...",
                duration: 2000,
            })
        } else {
            setUser(null);
            setRole(null);
            toast({
                title: res?.message || "Something went wrong while logging in...",
                duration: 2000,
            })
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