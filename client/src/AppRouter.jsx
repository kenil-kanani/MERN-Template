import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgotPassword, Home, SignIn, SignUp } from "./pages";
import { NavBar } from "./components";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "@/components/ui/toaster"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <Toaster />
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