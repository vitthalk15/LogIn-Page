import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.msg || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-blue-500">
            <div className="w-full max-w-md bg-custom-dark rounded-none shadow-2xl overflow-hidden relative">
                {/* Header */}
                <div className="absolute top-0 w-full h-1 bg-custom-teal"></div>

                <div className="flex justify-center -mt-10 mb-6 relative z-10">
                    <div className="bg-custom-teal text-white px-10 py-4 font-bold tracking-widest text-lg shadow-lg" style={{ marginTop: '-20px', paddingTop: '30px' }}>
                        SIGN IN
                    </div>
                </div>

                <div className="px-10 pb-10 pt-4">
                    {/* User Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center border-4 border-gray-500">
                            <User size={48} className="text-gray-400" />
                        </div>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="username (email)"
                                className="w-full pl-10 pr-4 py-3 bg-custom-dark-input text-white border-none rounded focus:ring-2 focus:ring-custom-teal focus:outline-none placeholder-gray-500"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="password"
                                className="w-full pl-10 pr-4 py-3 bg-custom-dark-input text-white border-none rounded focus:ring-2 focus:ring-custom-teal focus:outline-none placeholder-gray-500"
                                required
                            />
                        </div>

                        <div className="flex justify-between text-custom-teal text-xs">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="form-checkbox text-custom-teal rounded bg-custom-dark-input border-none" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="hover:underline">Forgot your password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-custom-teal hover:bg-teal-400 text-white font-bold py-3 px-4 rounded transition duration-300 uppercase tracking-wider"
                        >
                            Login
                        </button>

                        <div className="text-center mt-4">
                            <Link to="/register" className="text-gray-400 text-sm hover:text-white">New User? Register here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
