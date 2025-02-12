import {
    createBrowserRouter,

} from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home/Home";
import Register from "../pages/auth/Register";
import SignIn from "../pages/auth/SignIn";
import JobDetails from "../components/JobDetails";
import PrivateRouter from "./PrivateRouter";
import JobApply from "../pages/JobApply";
import MyApplications from "../pages/MyApplications";
import AddJob from "../pages/AddJob";


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
            },
            {
                path: "/jobapply/:id",
                element: <PrivateRouter>
                    <JobApply />
                </PrivateRouter>,
            },
            {
                path: "/myapplications",
                element: <PrivateRouter>
                    <MyApplications />
                </PrivateRouter>
            },
            {
                path: '/addjob',
                element: <PrivateRouter>
                    <AddJob />
                </PrivateRouter>
            }
        ]
    }
]);

export default router;