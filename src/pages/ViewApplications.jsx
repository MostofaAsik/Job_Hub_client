import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const ViewApplications = () => {
    const applications = useLoaderData();


    // Handle status change
    const handleStatusChange = (e, id) => {
        const newStatus = e.target.value;
        const data = {
            status: newStatus,
        }
        axios.patch(`${import.meta.env.VITE_BASE_URL}/application-job/${id}`, data)
            .then((response) => {
                console.log(response.data)
                toast.success('Status updated successfully.');
            })
            .catch((error) => {
                console.error(error)
                toast.error('Failed to update status.');
            })
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-xl font-semibold text-center mb-4">
                View Applications: {applications.length}
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Applicant Email</th>
                            <th className="p-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id} className="text-center border-b">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{app.applicant_email}</td>
                                <td className="p-2 border">
                                    <select
                                        defaultValue={app.status || 'Change Status'}
                                        onChange={(e) => handleStatusChange(e, app._id)}
                                        className="p-1 border rounded-md"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="under review">Under Review</option>
                                        <option value="hired">Hired</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Toaster />
        </div>
    );
};

export default ViewApplications;
