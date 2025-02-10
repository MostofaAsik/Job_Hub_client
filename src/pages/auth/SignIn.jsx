import Lottie from 'lottie-react';
import React, { useState } from 'react';
import registerAnimation from '../../assets/lottie/resgister.json';
import useAuth from './../../hooks/useAuth';
import { toast, Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../shared/SocialLogin';

const SignIn = () => {
    const { createSignIn } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state || '/';
    console.log(location);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        createSignIn(formData.email, formData.password)
            .then((result) => {
                toast.success('User signed in successfully!');
                console.log('User signed in successfully:', result.user);
                navigate(from);
            })
            .catch((error) => {
                toast.error('Error signing in: ' + error.message);
                console.error('Error signing in:', error);
                setError(error.message);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={registerAnimation} loop={true} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-center text-3xl font-bold mb-4 mt-2">Sign In</h1>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="fieldset-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                <div>
                                    <a className="link link-hover">Forgot password?</a>
                                </div>
                                <button type="submit" className="btn btn-neutral mt-4">Sign In</button>
                            </fieldset>
                        </form>
                        {/* Google login button */}
                        <div className="mt-4">
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default SignIn;
