import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const MainLayOut = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Navbar />

            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />


        </div>
    );
};

export default MainLayOut;