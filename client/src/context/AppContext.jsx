import { getUser, logout, signIn } from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUser() {
            const res = await getUser();
            if (res && res.data) {
                setUser({
                    name: res.data.name,
                    email: res.data.email,
                });
                setRole(res.data.role);
            } else {
                setUser(null);
                setRole(null);
                navigate("/sign-in")
            }
        }
        fetchUser().then(() => setIsLoading(false));
    }, [])

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
            navigate("/user-dashboard")
        } else {
            setUser(null);
            setRole(null);
            toast({
                title: res?.message || "Something went wrong while logging in...",
                duration: 2000,
            })
        }
    }

    const logOutUser = async () => {
        await logout();
        setUser(null);
        setRole(null);
        navigate("/sign-in")
        toast({
            title: "Successfully logged out...",
            duration: 2000,
        })
    }

    const value = {
        user,
        role,
        isLoading,
        signInUser,
        logOutUser
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
export { AppProvider };