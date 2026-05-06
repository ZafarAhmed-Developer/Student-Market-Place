import { useState } from 'react';
import { EmptyState } from '../components/Utilities';

export default function MyListingsPage() {
    const [listings, setListings] = useState([
        {
            id: '1',
            title: 'Introduction to Algorithms',
            price: 45.99,
            imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
            category: 'Books',
            status: 'available',
            createdAt: '2024-01-15',
        },
        {
            id: '2',
            title: 'Wireless Headphones',
            price: 79.99,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
            category: 'Electronics',
            status: 'sold',
            createdAt: '2024-01-10',
        },
    ]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            setListings((prev) => prev.filter((item) => item.id !== id));
        }
    };

    const handleEdit = (id) => {
        window.location.href = `/edit-listing/${id}`;
    };

    if (listings.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <EmptyState
                        title="No listings yet"
                        description="You haven't listed any items. Start selling today!"
                        action={{
                            label: 'Create Your First Listing',
                            onClick: () => (window.location.href = '/sell'),
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
                        <p className="text-gray-600 mt-2">Manage your product listings</p>
                    </div>
                    <a
                        href="/sell"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        + New Listing
                    </a>
                </div>

                <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Item</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date Listed</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {listings.map((listing) => (
                                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={listing.imageUrl}
                                                alt={listing.title}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">{listing.title}</p>
                                                <p className="text-sm text-gray-600">{listing.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-blue-600">${listing.price.toFixed(2)}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${listing.status === 'available'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(listing.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(listing.id)}
                                                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(listing.id)}
                                                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden grid grid-cols-1 gap-4">
                    {listings.map((listing) => (
                        <div key={listing.id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex gap-4 mb-4">
                                <img
                                    src={listing.imageUrl}
                                    alt={listing.title}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                                    <p className="text-sm text-gray-600">{listing.category}</p>
                                    <p className="text-lg font-bold text-blue-600 mt-2">${listing.price.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${listing.status === 'available'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                </span>
                                <p className="text-sm text-gray-600">
                                    Listed: {new Date(listing.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(listing.id)}
                                    className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(listing.id)}
                                    className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
