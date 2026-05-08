import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({
    _id,
    id, // for backward compatibility if needed
    title,
    price,
    images = [],
    imageUrl, // for backward compatibility if needed
    category,
    seller,
    location,
    isFavorite = false,
    onFavoriteToggle,
}) {
    const [isHovered, setIsHovered] = useState(false);

    // Use images[0] or fallback to imageUrl or a placeholder
    const displayImage = (images && images.length > 0)
        ? (images[0].startsWith('http') ? images[0] : `http://localhost:5000${images[0]}`)
        : (imageUrl || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400&h=300&fit=crop');

    const productId = _id || id;

    return (
        <Link to={`/product/${productId}`}>
            <div
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:scale-105 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                    <img
                        src={displayImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                        {category}
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onFavoriteToggle?.(productId);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                        <svg
                            className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                                }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                        {title}
                    </h3>

                    {location && (
                        <div className="flex items-center gap-1 text-gray-600 text-xs mb-3">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span>{location}</span>
                        </div>
                    )}

                    <div className="mb-3">
                        <p className="text-2xl font-bold text-blue-600">
                            ${typeof price === 'number' ? price.toFixed(2) : price}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-3 mt-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{seller?.name || 'Student'}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-xs text-gray-600">
                                        {seller?.rating ? seller.rating.toFixed(1) : '5.0'}
                                    </span>
                                </div>
                            </div>
                            <button className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors">
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
