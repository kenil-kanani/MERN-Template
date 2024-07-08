import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

const AppRouter = ({ children }) => {
    return (
        <BrowserRouter>
            <AppProvider>
                {children}
            </AppProvider>
        </BrowserRouter>
    )
}

export default AppRouter;