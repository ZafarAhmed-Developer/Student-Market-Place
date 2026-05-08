import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../components/Utilities';
import { createProduct } from '../api';

export default function SellPage() {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        condition: 'used',
    });
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            setTimeout(() => navigate('/'), 2000);
        } else {
            setIsAuthorized(true);
        }
    }, [navigate]);

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white rounded-xl shadow-sm border border-gray-100 p-10 max-w-sm mx-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-9a3 3 0 100-6 3 3 0 000 6z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
                    <p className="text-gray-500 text-sm mb-1">You need an account to sell items.</p>
                    <p className="text-gray-400 text-xs">Redirecting you back…</p>
                </div>
            </div>
        );
    }

    const categories = [
        { value: 'books', label: 'Books & Textbooks' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'furniture', label: 'Furniture' },
        { value: 'dorm', label: 'Dorm Essentials' },
        { value: 'clothing', label: 'Clothing & Accessories' },
        { value: 'other', label: 'Other' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files].slice(0, 5));
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!formData.title || !formData.description || !formData.price || !formData.category) {
            setError('Please fill in all required fields');
            return;
        }

        if (images.length === 0) {
            setError('Please upload at least one image');
            return;
        }

        setIsLoading(true);

        try {
            const result = await createProduct(formData, images);
            console.log('Product listed successfully:', result);
            setSuccess(true);

            setFormData({
                title: '',
                description: '',
                price: '',
                category: '',
                condition: 'used',
            });
            setImages([]);

            setTimeout(() => {
                navigate('/my-listings');
            }, 2000);
        } catch (err) {
            console.error('Error creating product:', err);
            setError(err.message || 'Failed to list product. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">List an Item</h1>
                    <p className="text-gray-600 mb-8">Sell your items to fellow students</p>

                    {success && (
                        <Alert
                            type="success"
                            message="Your item has been listed successfully!"
                            title="Success"
                        />
                    )}

                    {error && (
                        <Alert
                            type="error"
                            message={error}
                            title="Error"
                            onClose={() => setError('')}
                        />
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Item Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Introduction to Algorithms Textbook"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe the condition, features, and any defects..."
                                rows="5"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Condition
                            </label>
                            <div className="flex gap-4">
                                {['new', 'like-new', 'used', 'fair'].map((cond) => (
                                    <label key={cond} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value={cond}
                                            checked={formData.condition === cond}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-600"
                                        />
                                        <span className="text-sm text-gray-700 capitalize">{cond.replace('-', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Images <span className="text-red-500">*</span> (Max 5)
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-600 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-gray-600">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </label>
                            </div>

                            {images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Preview ${index}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                        >
                            {isLoading ? 'Listing item...' : 'List Item'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
