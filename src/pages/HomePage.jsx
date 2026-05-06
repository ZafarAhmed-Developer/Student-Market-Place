import { useState } from 'react';
import { FilterPanel } from '../components/SearchComponents';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [favorites, setFavorites] = useState([]);

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
            title: 'Desk Lamp LED',
            price: 29.99,
            imageUrl: 'https://images.unsplash.com/photo-1565636192335-14375bc58be0?w=400&h=300&fit=crop',
            category: 'Dorm Essentials',
            seller: { name: 'Danial', rating: 4.7 },
            location: 'Islamia University Bahawalpur',
        },
        {
            id: '4',
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

    const handleSearch = () => {
        console.log('Search:', searchValue, 'Category:', selectedCategory);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Buy & Sell with Your Campus Community
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 mb-8">
                            Find affordable textbooks, electronics, furniture, and more from fellow students.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search & Filter Section */}
            <section className="bg-gray-50 py-8 md:py-12">
                <div className="container mx-auto px-4 md:px-8">
                    <FilterPanel
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        categories={categories}
                        onSearch={handleSearch}
                    />
                </div>
            </section>

            {/* Products Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <p className="text-gray-600 mt-2">Browse items from your campus community</p>
                    </div>

                    <ProductGrid
                        products={mockProducts}
                        isLoading={false}
                        onFavoriteToggle={handleFavoriteToggle}
                        favorites={favorites}
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Have items to sell?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of students selling their items on StudentHub. It's free and easy!
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
