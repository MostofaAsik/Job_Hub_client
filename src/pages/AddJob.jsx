import React, { useState } from "react";
import useAuth from './../hooks/useAuth';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        jobType: "",
        category: "",
        applicationDeadline: "",
        salaryRange: { min: "", max: "", currency: "bdt" },
        description: "",
        company: "",
        hr_email: user?.email || "",
        hr_name: "",
        company_logo: "",
        requirements: [],
        responsibilities: [],
        status: "active", // Always "active"
    });

    const [requirementInput, setRequirementInput] = useState("");
    const [responsibilityInput, setResponsibilityInput] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle salary range inputs
    const handleSalaryChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            salaryRange: { ...formData.salaryRange, [name]: value },
        });
    };

    // Add requirement
    const addRequirement = () => {
        if (requirementInput.trim()) {
            setFormData({
                ...formData,
                requirements: [...formData.requirements, requirementInput.trim()],
            });
            setRequirementInput(""); // Clear input
        }
    };

    // Add responsibility
    const addResponsibility = () => {
        if (responsibilityInput.trim()) {
            setFormData({
                ...formData,
                responsibilities: [...formData.responsibilities, responsibilityInput.trim()],
            });
            setResponsibilityInput(""); // Clear input
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        axios.post(`${import.meta.env.VITE_BASE_URL}/jobs`, formData)
            .then((res) => {
                console.log("Job added successfully", res.data);
                toast.success("Job added successfully");
                navigate("/mypostedjobs");
            })
            .catch((err) => {
                console.error("Error adding job", err);
                toast.success("Error adding job");
            });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">📝 Post a Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                </div>

                {/* Location & Job Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Type</label>
                        <input type="text" name="jobType" value={formData.jobType} onChange={handleChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                    </div>
                </div>

                {/* Category & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
                        <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                    </div>
                </div>

                {/* Salary Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                    <div className="grid grid-cols-3 gap-4">
                        <input type="number" name="min" placeholder="Min" value={formData.salaryRange.min} onChange={handleSalaryChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                        <input type="number" name="max" placeholder="Max" value={formData.salaryRange.max} onChange={handleSalaryChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                        <select name="currency" value={formData.salaryRange.currency} onChange={handleSalaryChange}
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200">
                            <option value="bdt">BDT</option>
                            <option value="usd">USD</option>
                            <option value="eur">INR</option>
                        </select>
                    </div>
                </div>
                {/* Company Name & Company Logo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Logo (URL)</label>
                        <input type="text" name="company_logo" value={formData.company_logo} onChange={handleChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                    </div>
                </div>

                {/* HR Email & HR Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">HR Email</label>
                        <input type="email" name="hr_email" value={formData.hr_email} onChange={handleChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">HR Name</label>
                        <input type="text" name="hr_name" value={formData.hr_name} onChange={handleChange} required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Description</label>
                    <textarea name="description" rows="3" value={formData.description} onChange={handleChange} required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"></textarea>
                </div>

                {/* Responsibilities */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                    <div className="flex">
                        <input type="text" value={responsibilityInput} onChange={(e) => setResponsibilityInput(e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                        <button type="button" onClick={addResponsibility} className="ml-2 px-3 py-2 bg-green-500 text-white rounded-md">➕</button>
                    </div>
                    <ul className="mt-2 text-sm text-gray-600">
                        {formData.responsibilities.map((res, index) => <li key={index}>✔ {res}</li>)}
                    </ul>
                </div>

                {/* Requirements */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Requirements</label>
                    <div className="flex">
                        <input type="text" value={requirementInput} onChange={(e) => setRequirementInput(e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200" />
                        <button type="button" onClick={addRequirement} className="ml-2 px-3 py-2 bg-green-500 text-white rounded-md">➕</button>
                    </div>
                    <ul className="mt-2 text-sm text-gray-600">
                        {formData.requirements.map((req, index) => <li key={index}>✔ {req}</li>)}
                    </ul>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md">Submit Job</button>
            </form>
            <Toaster />
        </div>
    );
};

export default AddJob;
