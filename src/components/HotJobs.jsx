import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";



const HotJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/jobs`)
            .then((res) => {
                setJobs(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
                setLoading(false);
            });
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    🔥 Hot Jobs
                </h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading jobs...</p>
                ) : jobs.length === 0 ? (
                    <p className="text-center text-red-500">No jobs available.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all relative flex flex-col"
                            >
                                {/* Company Logo */}
                                <div className="flex justify-between items-center">
                                    <img
                                        src={job.company_logo}
                                        alt="Company Logo"
                                        className="w-14 h-14 object-cover rounded-lg"
                                    />
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-md">
                                        {job.category}
                                    </span>
                                </div>

                                {/* Job Title & Company */}
                                <h3 className="text-xl font-semibold text-gray-900 mt-3">{job.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">{job.company}</p>

                                {/* Location & Salary */}
                                <p className="mt-2 text-blue-600 font-medium">📍 {job.location || "Remote"}</p>

                                {/* Description */}
                                <p className="mt-2 text-sm text-gray-500">{job.description.substring(0, 100)}...</p>
                                <p className="mt-2 text-sm text-gray-500">Salary :{job.salaryRange.min} - {job.salaryRange.max}</p>

                                {/* Requirements Dropdown */}
                                <div className="mt-4">
                                    <button
                                        className="flex items-center text-blue-500 hover:underline text-sm font-medium"
                                        onClick={() => toggleDropdown(job._id)}
                                    >
                                        {openDropdown === job._id ? "Hide Requirements" : "Show Requirements"}
                                        {openDropdown === job._id ? (
                                            <FaChevronUp className="ml-2" />
                                        ) : (
                                            <FaChevronDown className="ml-2" />
                                        )}
                                    </button>
                                    {openDropdown === job._id && (
                                        <ul className="mt-2 text-sm text-gray-600 bg-gray-100 p-3 rounded-lg shadow-inner">
                                            {job.requirements.map((req, index) => (
                                                <li key={index} className="mb-1">✅ {req}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Spacer to push button down */}
                                <div className="flex-grow"></div>

                                {/* View Details Button (Always at Bottom) */}
                                <div className="mt-4">
                                    <a
                                        href={`/jobs/${job._id}`}
                                        className="block text-center text-white bg-blue-500 hover:bg-blue-700 py-2 rounded-md font-medium"
                                    >
                                        View Details
                                    </a>
                                </div>
                            </div>

                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HotJobs;
