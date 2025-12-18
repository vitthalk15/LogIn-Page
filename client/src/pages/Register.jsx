import React, { useState } from 'react';
import { User, Lock, Calendar, Mail } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const { name, dob, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response?.data);
            alert(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-blue-500 py-10">
            <div className="w-full max-w-md bg-custom-dark rounded-none shadow-2xl overflow-hidden relative">
                {/* Header */}

                <div className="flex justify-center mb-6 relative z-10 pt-8">
                    <div className="bg-custom-teal text-white px-10 py-4 font-bold tracking-widest text-lg shadow-lg absolute -top-5">
                        REGISTER
                    </div>
                </div>

                <div className="px-10 pb-10 pt-16">
                    <form onSubmit={onSubmit} className="space-y-6">

                        {/* Name */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                placeholder="Full Name"
                                className="w-full pl-10 pr-4 py-3 bg-custom-dark-input text-white border-none rounded focus:ring-2 focus:ring-custom-teal focus:outline-none placeholder-gray-500"
                                required
                            />
                        </div>

                        {/* DOB */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="date"
                                name="dob"
                                value={dob}
                                onChange={onChange}
                                className="w-full pl-10 pr-4 py-3 bg-custom-dark-input text-white border-none rounded focus:ring-2 focus:ring-custom-teal focus:outline-none placeholder-gray-500"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Email Address"
                                className="w-full pl-10 pr-4 py-3 bg-custom-dark-input text-white border-none rounded focus:ring-2 focus:ring-custom-teal focus:outline-none placeholder-gray-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                                className="w-full pl-10 pr-4 py-3 bg-custom-dark-input text-white border-none rounded focus:ring-2 focus:ring-custom-teal focus:outline-none placeholder-gray-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-custom-teal hover:bg-teal-400 text-white font-bold py-3 px-4 rounded transition duration-300 uppercase tracking-wider"
                        >
                            Register
                        </button>

                        <div className="text-center mt-4">
                            <Link to="/login" className="text-gray-400 text-sm hover:text-white">Already have an account? Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
