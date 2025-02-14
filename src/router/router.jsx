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
import MyPostedJobs from "../pages/MyPostedJobs";
import ViewApplications from "../pages/ViewApplications";


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
                loader: ({ params }) => fetch(`${import.meta.env.VITE_BASE_URL}/jobs/${params.id}`)
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
            },
            {
                path: "/mypostedjobs",
                element: <PrivateRouter>
                    <MyPostedJobs />
                </PrivateRouter>
            },
            {
                path: '/viewapplications/:job_id',
                element: <PrivateRouter>
                    <ViewApplications />
                </PrivateRouter>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_BASE_URL}/application-job/jobs/${params.job_id}`)
            }
        ]
    }
]);

export default router;