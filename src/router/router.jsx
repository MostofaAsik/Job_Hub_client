import {
    createBrowserRouter,

} from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home/Home";
import Register from "../pages/auth/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }
]);

export default router;