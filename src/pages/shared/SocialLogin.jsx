import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SocialLogin = () => {
    const { goooleLogin } = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state || '/';
    const handleGoogleLogin = () => {
        goooleLogin()
            .then((result) => {
                toast.success('Logged in with Google!');

                console.log('Google login success:', result.user);

                navigate(from)

            })
            .catch((error) => {
                toast.error('Google login failed: ' + error.message);
                console.error('Google login error:', error);
            });
    };
    return (
        <>
            <button
                onClick={handleGoogleLogin}
                className="btn btn-outline btn-neutral w-full flex items-center justify-center gap-2 mt-2"
            >
                <FaGoogle className="text-xl" />
                <span>Login with Google</span>
            </button>
            <Toaster />
        </>
    );
};

export default SocialLogin;