import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactMessage, setContactMessage] = useState('');

    const product = {
        id: '1',
        title: 'Introduction to Algorithms Textbook',
        price: 45.99,
        originalPrice: 89.99,
        images: [
            'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=500&fit=crop',
            'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=500&fit=crop',
        ],
        category: 'Books',
        condition: 'like-new',
        description: 'Excellent condition textbook. Minimal highlighting and notes. Perfect for algorithms course.',
        seller: {
            name: 'Zafar Ahmed',
            rating: 4.8,
            reviews: 24,
            campus: 'Karachi University',
        },
        location: 'Karachi University',
        postedDate: '2024-01-15',
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log('Message sent:', contactMessage);
        setContactMessage('');
        setShowContactForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Images */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                className="w-full h-96 object-cover"
                            />
                        </div>

                        <div className="flex gap-2 mb-8">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                                        }`}
                                >
                                    <img src={image} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div>
                                    <p className="text-4xl font-bold text-blue-600">${product.price}</p>
                                    {product.originalPrice && (
                                        <p className="text-gray-500 line-through">${product.originalPrice}</p>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        {product.condition.replace('-', ' ').toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <p className="text-sm text-gray-600">Category</p>
                                        <p className="font-semibold text-gray-900">{product.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Location</p>
                                        <p className="font-semibold text-gray-900">{product.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Posted</p>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(product.postedDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Condition</p>
                                        <p className="font-semibold text-gray-900">{product.condition}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Seller Info & Actions */}
                    <div>
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-20">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>

                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {product.seller.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{product.seller.name}</p>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-900">{product.seller.rating}</span>
                                        <span className="text-sm text-gray-600">({product.seller.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-6">
                                Selling from <strong>{product.seller.campus}</strong>
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowContactForm(!showContactForm)}
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    Contact Seller
                                </button>

                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`w-full py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 ${isFavorite
                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <svg
                                        className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
                                        fill={isFavorite ? 'currentColor' : 'none'}
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    {isFavorite ? 'Saved' : 'Save Item'}
                                </button>

                                <a
                                    href="/browse"
                                    className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center block"
                                >
                                    View More Items
                                </a>
                            </div>
                        </div>

                        {/* Show contact form when "Contact Seller" button is clicked */}
                        {showContactForm && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 ">
                                <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-xl font-bold text-gray-900">Contact Seller</h4>
                                        <button
                                            onClick={() => setShowContactForm(false)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <form onSubmit={handleSendMessage} className="space-y-4">
                                        <textarea
                                            value={contactMessage}
                                            onChange={(e) => setContactMessage(e.target.value)}
                                            placeholder="Hi, I'm interested in this item..."
                                            rows="5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none text-gray-700"
                                            required
                                        />
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowContactForm(false)}
                                                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                                            >
                                                Send Message
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
