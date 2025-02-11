import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, signOutUser } = useAuth()

    const links = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/myapplications">My Applications</Link></li>

    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="text-2xl font-bold">Job Hub</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {
                    user ?
                        <>
                            <button
                                onClick={() => signOutUser()}
                                className="btn btn-primary">Log Out</button>
                        </> :
                        <>
                            <Link to="/register" className="btn">Register</Link>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        </>
                }

            </div>
        </div>
    );
};

export default Navbar;