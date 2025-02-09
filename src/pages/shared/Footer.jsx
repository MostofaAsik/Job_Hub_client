import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white py-6">
            <div className="container mx-auto px-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-lg font-bold">JOb Hub</h2>
                        <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
                    </div>
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
            </div>
        </footer>
    );
};

export default Footer;
