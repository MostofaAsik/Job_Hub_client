import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const JobApply = () => {
    const { id } = useParams();
    const { user } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        linkedin: "",
        github: "",
        resume: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const applicationJob = {
            job_id: id,
            applicant_email: user.email,
            linkedin: formData.linkedin,
            github: formData.github,
            resume: formData.resume,
        }

        axios.post(`${import.meta.env.VITE_BASE_URL}/application-job`, applicationJob)
            .then(() => {
                toast.success("Job application submitted successfully!");
                navigate('/myapplications')
            })
            .catch((error) => {
                toast.error("Failed to submit job application. Please try again later.");
                console.error(error);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    🌟 Attach your Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* LinkedIn Input */}
                    <div>
                        <label className="block text-gray-700 font-medium">LinkedIn URL</label>
                        <input
                            type="url"
                            name="linkedin"
                            placeholder="https://www.linkedin.com/in/your-profile"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* GitHub Input */}
                    <div>
                        <label className="block text-gray-700 font-medium">GitHub URL</label>
                        <input
                            type="url"
                            name="github"
                            placeholder="https://github.com/your-profile"
                            value={formData.github}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Resume Input */}
                    <div>
                        <label className="block text-gray-700 font-medium">Resume URL</label>
                        <input
                            type="url"
                            name="resume"
                            placeholder="https://yourwebsite.com/resume.pdf"
                            value={formData.resume}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
                    >
                        Apply Job
                    </button>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default JobApply;
