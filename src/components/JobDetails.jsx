import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaEnvelope } from "react-icons/fa";

const JobDetails = () => {
    const job = useLoaderData(); // Get job data from loader
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (section) => {
        setOpenDropdown(openDropdown === section ? null : section);
    };

    return (
        <section className="py-12 bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <img src={job.company_logo} alt={job.company} className="w-16 h-16 rounded-lg" />
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-md">
                        {job.category}
                    </span>
                </div>

                {/* Job Title & Company */}
                <h2 className="text-2xl font-bold text-gray-800 mt-4">{job.title}</h2>
                <p className="text-gray-600 text-sm">{job.company}</p>

                {/* Location, Type, Salary & Deadline */}
                <div className="mt-4 text-gray-700">
                    <p className="font-medium">📍 Location: {job.location}</p>
                    <p className="font-medium">🏢 Job Type: {job.jobType}</p>
                    <p className="font-medium">
                        💰 Salary: {job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency.toUpperCase()}
                    </p>
                    <p className="font-medium">📅 Deadline: {job.applicationDeadline}</p>
                </div>

                {/* Job Description */}
                <p className="mt-4 text-gray-600">{job.description}</p>

                {/* Dropdown for Requirements */}
                <div className="mt-6">
                    <button
                        className="flex items-center text-blue-600 hover:underline text-lg font-medium"
                        onClick={() => toggleDropdown("requirements")}
                    >
                        {openDropdown === "requirements" ? "Hide Requirements" : "Show Requirements"}
                        {openDropdown === "requirements" ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                    </button>
                    {openDropdown === "requirements" && (
                        <ul className="mt-2 text-gray-600 bg-gray-100 p-3 rounded-lg shadow-inner">
                            {job.requirements.map((req, index) => (
                                <li key={index} className="mb-1">✅ {req}</li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Dropdown for Responsibilities */}
                <div className="mt-4">
                    <button
                        className="flex items-center text-blue-600 hover:underline text-lg font-medium"
                        onClick={() => toggleDropdown("responsibilities")}
                    >
                        {openDropdown === "responsibilities" ? "Hide Responsibilities" : "Show Responsibilities"}
                        {openDropdown === "responsibilities" ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                    </button>
                    {openDropdown === "responsibilities" && (
                        <ul className="mt-2 text-gray-600 bg-gray-100 p-3 rounded-lg shadow-inner">
                            {job.responsibilities.map((res, index) => (
                                <li key={index} className="mb-1">✅ {res}</li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Contact HR */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
                    <p className="text-gray-700 font-medium">📧 Contact HR:</p>
                    <p className="text-gray-600">👤 {job.hr_name}</p>
                    <p className="text-gray-600 flex items-center">
                        <FaEnvelope className="mr-2" /> {job.hr_email}
                    </p>
                </div>

                {/* Apply Now Button */}
                <div className="mt-6">
                    <a
                        href={`mailto:${job.hr_email}?subject=Application for ${job.title}`}
                        className="block text-center text-white bg-blue-500 hover:bg-blue-700 py-3 rounded-md font-medium text-lg"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default JobDetails;
