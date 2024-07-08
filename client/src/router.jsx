import { createBrowserRouter } from "react-router-dom";
import { ForgotPassword, Home, SignIn, SignUp } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
]);

export default router;