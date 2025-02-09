import Lottie from 'lottie-react';
import React, { useState } from 'react';
import registerAnimation from '../../assets/lottie/resgister.json';
import useAuth from './../../hooks/useAuth';
import { toast, Toaster } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa'; // Google icon from react-icons
import SocialLogin from '../shared/SocialLogin';

const Register = () => {
    const { createUser } = useAuth();  // Assuming signInWithGoogle is defined in useAuth hook
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validatePassword(formData.password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long.');
            return;
        }
        // Create user
        createUser(formData.email, formData.password)
            .then((result) => {
                toast.success('User created successfully!');
                console.log('User created successfully:', result.user);
            })
            .catch((error) => {
                toast.error('Error creating user: ' + error.message);
                console.error('Error creating user:', error);
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
                    <h1 className="text-center text-3xl font-bold mb-4 mt-2">Register now!</h1>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
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

                                <button type="submit" className="btn btn-neutral mt-4">Register</button>
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

export default Register;
