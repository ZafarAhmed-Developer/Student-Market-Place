import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, LogOut, ShoppingBag, Star, MapPin, Edit2, Camera, Save, X } from 'lucide-react';
import { updateProfile, getMe, getUserSellList, IMAGE_BASE } from '../api';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: '', phone: '', campus: '' });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [sellList, setSellList] = useState([]);
    const [isLoadingStats, setIsLoadingStats] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                navigate('/');
                return;
            }

            try {
                setIsLoadingStats(true);
                // Get fresh data from server
                const freshUser = await getMe();
                setUser(freshUser);
                setEditData({
                    name: freshUser.name || '',
                    phone: freshUser.phone || '',
                    campus: freshUser.campus || ''
                });
                if (freshUser.avatar) {
                    setAvatarPreview(freshUser.avatar.startsWith('http') ? freshUser.avatar : `${IMAGE_BASE}${freshUser.avatar}`);
                }
                
                // Also fetch the 4th collection (Sell List)
                const list = await getUserSellList(freshUser._id);
                setSellList(list);

            } catch (err) {
                console.error('Failed to fetch user data:', err);
                // Fallback to local storage if server fails
                const userData = JSON.parse(storedUser);
                setUser(userData);
            } finally {
                setIsLoadingStats(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const updatedUser = await updateProfile(editData, avatarFile);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    const displayName = user.name ? (user.name.charAt(0).toUpperCase() + user.name.slice(1)) : 'Student';
    const initials = user.name ? user.name.slice(0, 2).toUpperCase() : 'ST';

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">

                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="h-28 bg-gradient-to-r from-blue-600 to-blue-700" />
                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
                            <div className="flex items-end gap-4">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-3xl font-bold text-blue-600 bg-blue-50">
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt={displayName} className="w-full h-full object-cover" />
                                        ) : (
                                            initials
                                        )}
                                    </div>
                                    {isEditing && (
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                                        >
                                            <Camera size={24} />
                                        </button>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                                <div className="pb-1 flex-1">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="text-2xl font-bold text-gray-900 border-b border-blue-600 outline-none w-full bg-transparent"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        />
                                    ) : (
                                        <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                                    )}
                                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-0.5">
                                        <MapPin size={13} /> Student • {user.campus || 'Campus Marketplace'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 self-start sm:self-auto">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                        >
                                            <Save size={16} />
                                            {isSaving ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setAvatarPreview(user.avatar ? (user.avatar.startsWith('http') ? user.avatar : `${IMAGE_BASE}${user.avatar}`) : null);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <X size={16} />
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                                        >
                                            <Edit2 size={16} />
                                            Edit Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                                <p className="text-gray-700 font-medium">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">WhatsApp Number</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="text-gray-700 font-medium border-b border-blue-600 outline-none w-full bg-transparent"
                                        value={editData.phone}
                                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-gray-700 font-medium">{user.phone || 'Not set'}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Campus</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="text-gray-700 font-medium border-b border-blue-600 outline-none w-full bg-transparent"
                                        value={editData.campus}
                                        onChange={(e) => setEditData({ ...editData, campus: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-gray-700 font-medium">{user.campus || 'Not set'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'Listings', value: user.sellCount || 0, icon: Package, color: 'text-blue-600 bg-blue-50' },
                        { label: 'Reviews', value: user.numReviews || 0, icon: Star, color: 'text-green-600 bg-green-50' },
                        { label: 'Rating', value: user.rating ? user.rating.toFixed(1) : '5.0', icon: Star, color: 'text-yellow-600 bg-yellow-50' },
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

                {/* User Sell List (The 4th Collection) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">My Sales Registry</h2>
                    {sellList.length === 0 ? (
                        <p className="text-gray-500 text-sm italic text-center py-4">No sales recorded in the registry yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="pb-3 font-semibold text-gray-600">Product Name</th>
                                        <th className="pb-3 font-semibold text-gray-600">Price</th>
                                        <th className="pb-3 font-semibold text-gray-600">Date Listed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sellList.map((item) => (
                                        <tr key={item._id} className="border-b border-gray-50 last:border-0">
                                            <td className="py-3 font-medium text-gray-900">{item.productName}</td>
                                            <td className="py-3 text-gray-600">Rs. {item.product?.price || 'N/A'}</td>
                                            <td className="py-3 text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
