import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
<<<<<<< HEAD

=======
// import { allProducts } from './HomePage'; 
>>>>>>> d9460f49bda9fa6d659e0b78bf3077dee80ee6d9

const allProducts = [
    {
        id: '1',
        title: 'Introduction to Algorithms Textbook',
        price: 45.99,
        images: [
            'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=500&fit=crop',
            'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=500&fit=crop',
        ],
        category: 'Books',
        condition: 'like-new',
        description: 'Excellent condition textbook. Minimal highlighting and notes. Perfect for algorithms course.',
        seller: {
            name: 'Zafar Ahmed',
            phone: '+923001234567', // Added phone for WhatsApp/Show Number
            rating: 4.8,
            reviews: 24,
            campus: 'Karachi University',
        },
        location: 'Karachi University',
        postedDate: '2024-01-15',
    },
    // Your other products (Laptop, Phone, etc. ) should be in this list too!
];

export default function ProductDetailPage() {
    const { id } = useParams();


    const [showContactForm, setShowContactForm] = useState(false);
    const [showNumber, setShowNumber] = useState(false);
    const [contactMessage, setContactMessage] = useState("Hi, I'm interested in this item...");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const product = allProducts.find(p => p.id.toString() === id?.toString());


    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
                <Link to="/" className="mt-4 text-blue-600 hover:underline">Back to Home</Link>
            </div>
        );
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log('Sending message:', contactMessage);
        setShowContactForm(false);
        alert('Message sent to seller!');
    };

    return (
        <div className="min-h-screen bg-[#f7f8f8] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-sm text-gray-500">
                    <Link to="/" className="hover:text-gray-700">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/browse" className="hover:text-gray-700">{product.category}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Images & Description */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                            <div className="relative h-[500px] bg-black flex items-center justify-center">
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={product.title}
                                    className="max-h-full max-w-full object-contain"
                                />
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                                            className="absolute left-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setCurrentImageIndex(prev => (prev + 1) % product.images.length)}
                                            className="absolute right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>
                            {/* Thumbnails */}
                            <div className="flex p-4 gap-2 overflow-x-auto bg-gray-50">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-blue-600' : 'border-transparent'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Price & Seller Info */}
                    <div className="space-y-6">
                        {/* Price Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-4xl font-bold text-[#002f34]">${product.price}</h1>
                                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-xl text-gray-600 mb-6">{product.title}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                                <span>{product.location}</span>
                                <span>{product.postedDate}</span>
                            </div>
                        </div>

                        {/* Seller Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Seller Information</h3>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-[#002f34] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {product.seller.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">{product.seller.name}</h4>
                                    <p className="text-gray-500">Member since Jan 2024</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowContactForm(true)}
                                className="w-full py-4 bg-[#002f34] text-white rounded-lg font-bold hover:bg-[#003d45] transition-all shadow-lg"
                            >
                                Chat with seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Modal (OLX Style) */}
            {showContactForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-[#002f34]">Contact Seller</h4>
                            <button onClick={() => setShowContactForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>

                        <div className="space-y-4 mb-6">
                            {/* Show Number */}
                            <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between bg-gray-50">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Phone Number</p>
                                    <p className="text-lg font-bold text-[#002f34]">
                                        {showNumber ? product.seller.phone : "+92 300 •••••••"}
                                    </p>
                                </div>
                                {!showNumber && (
                                    <button onClick={() => setShowNumber(true)} className="text-blue-600 font-bold hover:underline text-sm">Show Number</button>
                                )}
                            </div>

                            {/* WhatsApp */}
                            <a
                                href={`https://wa.me/${product.seller.phone.replace(/\D/g, '')}?text=Hi, I'm interested in: ${encodeURIComponent(product.title)}`}
                                target="_blank" rel="noopener noreferrer"
                                className="w-full py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] font-bold flex items-center justify-center gap-2 transition-colors"
                            >
                                WhatsApp
                            </a>
                        </div>

                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <p className="text-sm font-bold text-gray-700">Or send a message:</p>
                            <textarea
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002f34] resize-none text-gray-700"
                                required
                            />
                            <button type="submit" className="w-full py-3 bg-[#002f34] text-white rounded-lg hover:bg-[#003d45] font-bold">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
