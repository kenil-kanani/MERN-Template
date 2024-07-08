import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgotPassword, Home, SignIn, SignUp } from "./pages";
import { NavBar } from "./components";
import { AppProvider } from "./context/AppContext";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </AppProvider>
        </BrowserRouter>
    )
}

export default AppRouter;