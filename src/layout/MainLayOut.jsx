import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';

const MainLayOut = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Navbar />
            <Outlet />
            <h2>Footer is Here</h2>



        </div>
    );
};

export default MainLayOut;