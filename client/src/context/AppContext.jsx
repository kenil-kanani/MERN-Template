import { createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);



    const value = {
        user
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
export { AppProvider };