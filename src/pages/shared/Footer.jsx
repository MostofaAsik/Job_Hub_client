import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import jobsImage from '/jobs.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="container mx-auto px-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 flex items-center space-x-2">
                        <img src={jobsImage} alt="Jobs Logo" className="w-16 h-14" />
                        <h2 className="text-lg font-bold">Job Hub</h2>
                    </div>
                    <p className="text-sm text-center md:text-left">
                        Connecting talents with opportunities. Your dream job is just a click away.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-gray-400">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-gray-400">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-gray-400">
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Job Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
