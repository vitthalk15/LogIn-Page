import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Settings, XCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
                    headers: { 'x-auth-token': token }
                });
                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-white p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-700">User Management</h1>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">#</th>
                                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Date Created</th>
                                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-600">{index + 1}</td>
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500 font-bold text-lg">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-gray-700">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600">{new Date(user.dateCreated).toLocaleDateString()}</td>
                                    <td className="p-4 text-gray-600">{user.role}</td>
                                    <td className="p-4">
                                        <span className={`flex items-center text-sm font-medium ${user.status === 'Active' ? 'text-green-500' : 'text-orange-500'}`}>
                                            <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <Settings className="text-blue-400 cursor-pointer hover:text-blue-600" size={20} />
                                            <XCircle className="text-red-400 cursor-pointer hover:text-red-600" size={20} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Dummy UI */}
                    <div className="flex justify-between items-center p-4 border-t border-gray-100 text-gray-500 text-sm">
                        <span>Showing 1 to {users.length} of {users.length} entries</span>
                        <div className="flex items-center space-x-2">
                            <span className="cursor-pointer hover:text-blue-500">Previous</span>
                            <div className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded transition">1</div>
                            <span className="cursor-pointer hover:text-blue-500">Next</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
