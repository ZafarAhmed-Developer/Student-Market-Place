import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

export default function BrowsePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) {
            setSelectedCategory(cat);
        } else {
            setSelectedCategory('');
        }
    }, [searchParams]);

    const handleCategoryChange = (val) => {
        setSelectedCategory(val);
        if (val) {
            setSearchParams({ category: val });
        } else {
            setSearchParams({});
        }
    };

    const mockProducts = [
        {
            id: '1',
            title: 'Introduction to Algorithms',
            price: 45.99,
            imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
            category: 'Books',
            seller: { name: 'Zafar Ahmed', rating: 4.8 },
            location: 'Karachi University',
        },
        {
            id: '2',
            title: 'MacBook Pro 13"',
            price: 899.99,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
            category: 'Electronics',
            seller: { name: 'Abrar', rating: 4.9 },
            location: 'LUMS Campus',
        },
        {
            id: '3',
            title: 'Wireless Headphones',
            price: 79.99,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
            category: 'Electronics',
            seller: { name: 'Moeed', rating: 4.8 },
            location: 'NED University',
        },
    ];

    const categories = [
        { value: 'books', label: 'Books' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'furniture', label: 'Furniture' },
        { value: 'dorm', label: 'Dorm Essentials' },
    ];

    const handleFavoriteToggle = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    const filteredProducts = mockProducts.filter((product) => {
        const matchesCategory = !selectedCategory || product.category.toLowerCase() === selectedCategory;
        return matchesCategory;
    });

    const categoryLabels = {
        books: 'Books',
        electronics: 'Electronics',
        furniture: 'Furniture',
        dorm: 'Dorm Essentials',
    };

    return (
        <>
            <section className="bg-white border-b border-gray-200 py-8">
                <div className="container mx-auto px-4 md:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                        {selectedCategory ? (
                            <>
                                <span className="text-gray-500 text-sm">Filtered by:</span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {categoryLabels[selectedCategory] || selectedCategory}
                                    <button
                                        onClick={() => handleCategoryChange('')}
                                        className="ml-1 text-blue-500 hover:text-blue-800 font-bold"
                                        aria-label="Clear filter"
                                    >
                                        ×
                                    </button>
                                </span>
                                <span className="text-gray-400 text-sm">{filteredProducts.length} items</span>
                            </>
                        ) : (
                            <span className="text-gray-500 text-sm">Showing all {filteredProducts.length} items — select a category above to filter</span>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-8">
                    <ProductGrid
                        products={filteredProducts}
                        isLoading={isLoading}
                        onFavoriteToggle={handleFavoriteToggle}
                        favorites={favorites}
                    />
                </div>
            </section>
        </>
    );
}
