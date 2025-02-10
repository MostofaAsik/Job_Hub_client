import {
    createBrowserRouter,

} from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home/Home";
import Register from "../pages/auth/Register";
import SignIn from "../pages/auth/SignIn";
import JobDetails from "../components/JobDetails";
import PrivateRouter from "./PrivateRouter";


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
            },
            {
                path: '/login',
                element: <SignIn />
            },
            {
                path: "/jobs/:id",
                element: <PrivateRouter>
                    <JobDetails />
                </PrivateRouter>,
                loader: ({ params }) => fetch(`http://localhost:3000/jobs/${params.id}`)
            }
        ]
    }
]);

export default router;