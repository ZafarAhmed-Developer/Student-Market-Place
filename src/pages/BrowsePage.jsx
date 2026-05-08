import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../api';

export default function BrowsePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cat = searchParams.get('category');
        setSelectedCategory(cat || '');
        
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const params = {};
                if (cat) params.category = cat;
                const data = await getProducts(params);
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams]);

    const handleCategoryChange = (val) => {
        setSelectedCategory(val);
        if (val) {
            setSearchParams({ category: val });
        } else {
            setSearchParams({});
        }
    };

    const handleFavoriteToggle = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    const categoryLabels = {
        books: 'Books',
        electronics: 'Electronics',
        furniture: 'Furniture',
        dorm: 'Dorm Essentials',
        clothing: 'Clothing & Accessories',
        other: 'Other'
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
                                <span className="text-gray-400 text-sm">{products.length} items</span>
                            </>
                        ) : (
                            <span className="text-gray-500 text-sm">Showing all {products.length} items — select a category above to filter</span>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-8">
                    {error ? (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
                            {error}
                        </div>
                    ) : (
                        <ProductGrid
                            products={products}
                            isLoading={isLoading}
                            onFavoriteToggle={handleFavoriteToggle}
                            favorites={favorites}
                        />
                    )}
                </div>
            </section>
        </>
    );
}
