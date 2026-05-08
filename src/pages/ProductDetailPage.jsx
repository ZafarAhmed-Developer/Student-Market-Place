import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, submitReview, getSellerReviews, IMAGE_BASE } from '../api';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [showNumber, setShowNumber] = useState(false);
    const [contactMessage, setContactMessage] = useState("Hi, I'm interested in this item...");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Rating state
    const [userRating, setUserRating] = useState(5);
    const [userComment, setUserComment] = useState('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState('');
    const [reviewError, setReviewError] = useState('');

    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const productData = await getProductById(id);
                setProduct(productData);
                
                if (productData.seller?._id) {
                    const reviewData = await getSellerReviews(productData.seller._id);
                    setReviews(reviewData);
                }
                
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Product not found');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log('Sending message:', contactMessage);
        setShowContactForm(false);
        alert('Message sent to seller!');
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setReviewError('Please login to rate this seller');
            return;
        }
        
        setIsSubmittingReview(true);
        setReviewError('');
        setReviewSuccess('');
        
        try {
            await submitReview(product.seller._id, { rating: userRating, comment: userComment });
            setReviewSuccess('Thank you for your rating!');
            setUserComment('');
            // Refresh product to get updated rating
            const updatedProduct = await getProductById(id);
            setProduct(updatedProduct);
        } catch (err) {
            setReviewError(err.message || 'Failed to submit review');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800">{error || 'Product not found'}</h2>
                <Link to="/" className="mt-4 text-blue-600 hover:underline">Back to Home</Link>
            </div>
        );
    }

    const images = product.images && product.images.length > 0 
        ? product.images.map(img => img.startsWith('http') ? img : `${IMAGE_BASE}${img}`)
        : ['https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=600&h=500&fit=crop'];

    const sellerRating = product.seller?.rating || 5.0;

    return (
        <div className="min-h-screen bg-[#f7f8f8] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-sm text-gray-500">
                    <Link to="/" className="hover:text-gray-700">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/browse" className="hover:text-gray-700 capitalize">{product.category}</Link>
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
                                    src={images[currentImageIndex]}
                                    alt={product.title}
                                    className="max-h-full max-w-full object-contain"
                                />
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                            className="absolute left-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
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
                                {images.map((img, idx) => (
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
                        
                        {/* Rating Section */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate this Seller</h2>
                            {currentUser && currentUser._id !== product.seller?._id ? (
                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    {reviewSuccess && <p className="text-green-600 font-medium">{reviewSuccess}</p>}
                                    {reviewError && <p className="text-red-600 font-medium">{reviewError}</p>}
                                    
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700 font-medium">Rating:</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setUserRating(star)}
                                                    className={`text-2xl ${userRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <textarea
                                        value={userComment}
                                        onChange={(e) => setUserComment(e.target.value)}
                                        placeholder="Optional: Share your experience with this seller..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none h-24 resize-none"
                                    />
                                    
                                    <button
                                        type="submit"
                                        disabled={isSubmittingReview}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        {isSubmittingReview ? 'Submitting...' : 'Submit Rating'}
                                    </button>
                                </form>
                            ) : (
                                <p className="text-gray-500 italic">
                                    {!currentUser ? 'Login to rate this seller.' : 'You cannot rate your own listing.'}
                                </p>
                            )}
                        </div>

                        {/* Reviews List */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
                            {reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {reviews.map((review) => (
                                        <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                        {review.user?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <span className="font-bold text-gray-900">{review.user?.name || 'Anonymous'}</span>
                                                </div>
                                                <div className="flex text-yellow-400 text-xs">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <span key={s}>{review.rating >= s ? '★' : '☆'}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                                            <p className="text-gray-400 text-[10px] mt-2">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic text-sm">No reviews yet for this seller.</p>
                            )}
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
                                <span>{product.location || product.seller?.campus}</span>
                                <span>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : ''}</span>
                            </div>
                        </div>

                        {/* Seller Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Seller Information</h3>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-[#002f34] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {product.seller?.name?.charAt(0) || 'S'}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">{product.seller?.name || 'Student'}</h4>
                                    <div className="flex items-center gap-1 mt-1">
                                        <div className="flex text-yellow-400 text-sm">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <span key={s}>{sellerRating >= s ? '★' : '☆'}</span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 font-bold ml-1">
                                            ({sellerRating.toFixed(1)})
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1">Member since {product.seller?.createdAt ? new Date(product.seller.createdAt).getFullYear() : '2024'}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowContactForm(true)}
                                    className="w-full py-4 bg-[#002f34] text-white rounded-lg font-bold hover:bg-[#003d45] transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span>Chat with seller</span>
                                </button>
                                
                                {product.seller?.phone && (
                                    <a
                                        href={`https://wa.me/${product.seller.phone.replace(/\D/g, '')}?text=Hi, I'm interested in: ${encodeURIComponent(product.title)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="w-full py-4 bg-[#25D366] text-white rounded-lg font-bold hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.435 5.633 1.435h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        <span>WhatsApp Seller</span>
                                    </a>
                                )}
                            </div>
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
                                        {showNumber ? (product.seller?.phone || 'No phone provided') : "+92 300 •••••••"}
                                    </p>
                                </div>
                                {!showNumber && (
                                    <button onClick={() => setShowNumber(true)} className="text-blue-600 font-bold hover:underline text-sm">Show Number</button>
                                )}
                            </div>

                            {/* WhatsApp */}
                            {product.seller?.phone && (
                                <a
                                    href={`https://wa.me/${product.seller.phone.replace(/\D/g, '')}?text=Hi, I'm interested in: ${encodeURIComponent(product.title)}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="w-full py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    WhatsApp
                                </a>
                            )}
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
