import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const MyPostedJobs = () => {
    const { user } = useAuth()
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/jobs?email=${user?.email}`)
            .then((response) => {
                setJobs(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [user?.email])

    return (
        <div>
            <h2>My Posted Job</h2>
            {jobs.length === 0 ? (
                <p className="text-gray-500 text-center">No jobs available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                                <th className="py-3 px-4 text-left">Title</th>
                                <th className="py-3 px-4 text-left hidden md:table-cell">Deadline</th>
                                <th className="py-3 px-4 text-left hidden md:table-cell">Applicant Count</th>
                                <th className="py-3 px-4 text-center">View Applications</th>
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
                                        <span className="font-medium text-sm md:text-base">{job.title}</span>
                                    </td>
                                    {/* 📌 Hide Columns on Mobile */}
                                    <td className="py-3 px-4 hidden md:table-cell">{job.applicationDeadline}</td>
                                    <td className="py-3 px-4 hidden md:table-cell">{job.applicantion_count}</td>
                                    {/* 📌 Delete Button → Icon on Mobile, Full Button on Desktop */}
                                    <td className="py-3 px-4 text-center">
                                        <Link to={`/viewapplications/${job._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">View Applications</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyPostedJobs;