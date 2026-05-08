import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, LogOut, ShoppingBag, Star, MapPin } from 'lucide-react';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/');
            return;
        }
        try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
        } catch (e) {
            console.error('Failed to parse user from localStorage');
            localStorage.removeItem('user');
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    if (!user) return null;

    const displayName = user.name ? (user.name.charAt(0).toUpperCase() + user.name.slice(1)) : 'Student';
    const initials = user.name ? user.name.slice(0, 2).toUpperCase() : 'ST';

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">

                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="h-28 bg-gradient-to-r from-blue-600 to-blue-700" />
                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
                            <div className="flex items-end gap-4">
                                <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-600 bg-blue-50">
                                    {initials}
                                </div>
                                <div className="pb-1">
                                    <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-0.5">
                                        <MapPin size={13} /> Student • Campus Marketplace
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors self-start sm:self-auto"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>

                        <div className="mt-5 flex items-center gap-1 text-sm text-gray-500">
                            <span className="font-medium text-gray-700">{user.email}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'Listings', value: '0', icon: Package, color: 'text-blue-600 bg-blue-50' },
                        { label: 'Sold', value: '0', icon: ShoppingBag, color: 'text-green-600 bg-green-50' },
                        { label: 'Rating', value: '—', icon: Star, color: 'text-yellow-600 bg-yellow-50' },
                    ].map(({ label, value, icon: Icon, color }) => (
                        <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                                <Icon size={20} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{value}</span>
                            <span className="text-xs text-gray-500">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Seller Dashboard</h2>
                        <Link to="/sell" className="text-blue-600 text-sm font-semibold hover:underline">+ List New Item</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link
                            to="/sell"
                            className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                                <Package size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Post a Listing</p>
                                <p className="text-xs text-gray-500">Sell your items quickly</p>
                            </div>
                        </Link>
                        <Link
                            to="/my-listings"
                            className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                                <ShoppingBag size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">My Listings</p>
                                <p className="text-xs text-gray-500">Manage your listings</p>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
