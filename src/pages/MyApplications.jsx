import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import delete icon
import toast, { Toaster } from "react-hot-toast";

const MyApplications = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/application-job?email=${user?.email}`, { withCredentials: true })
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user?.email]);

    const handleDelete = (id) => {
        axios
            .delete(`${import.meta.env.VITE_BASE_URL}/application-job/${id}`)
            .then(() => {
                setJobs(jobs.filter((job) => job._id !== id));
                toast.success("Job application deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting job:", error);
            });
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📋 My Job Applications</h2>

            {jobs.length === 0 ? (
                <p className="text-gray-500 text-center">No jobs available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                                <th className="py-3 px-4 text-left">Company</th>
                                <th className="py-3 px-4 text-left hidden md:table-cell">Job Title</th>
                                <th className="py-3 px-4 text-left hidden md:table-cell">Location</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {jobs.map((job) => (
                                <tr key={job._id} className="border-b hover:bg-gray-100 transition-all">
                                    {/* 📌 Company Logo & Name in One Column for Mobile */}
                                    <td className="py-3 px-4 flex items-center">
                                        <img
                                            src={job.company_logo}
                                            alt={job.company}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <span className="font-medium text-sm md:text-base">{job.company}</span>
                                    </td>
                                    {/* 📌 Hide Columns on Mobile */}
                                    <td className="py-3 px-4 hidden md:table-cell">{job.title}</td>
                                    <td className="py-3 px-4 hidden md:table-cell">{job.location}</td>
                                    {/* 📌 Delete Button → Icon on Mobile, Full Button on Desktop */}
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => handleDelete(job._id)}
                                            className="text-red-500 hover:text-red-700 p-2 md:bg-red-500 md:text-white md:px-4 md:py-2 md:rounded-lg transition-all"
                                        >
                                            <FaTrash className="text-lg md:hidden" />
                                            <span className="hidden md:inline">❌ Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default MyApplications;
