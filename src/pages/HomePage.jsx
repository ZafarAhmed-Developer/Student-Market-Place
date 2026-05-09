import { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../api';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const data = await getProducts();
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
    }, []);

    const handleFavoriteToggle = (id) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((fav) => fav !== id)
                : [...prev, id]
        );
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Buy & Sell with Your Universities Community
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 mb-8">
                            Find affordable textbooks, electronics, furniture, and more from fellow students.
                        </p>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <p className="text-gray-600 mt-2">Browse items from your campus community</p>
                    </div>

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

            {/* CTA Section */}
            <section className="bg-blue-50 py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Have items to sell?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of students selling their items on Uni Market. It's free and easy!
                    </p>
                    <a
                        href="/sell"
                        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Start Selling Now
                    </a>
                </div>
            </section>
        </>
    );
}
