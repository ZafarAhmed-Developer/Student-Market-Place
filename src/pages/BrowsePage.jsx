import { useState } from 'react';
import { FilterPanel } from '../components/SearchComponents';
import ProductGrid from '../components/ProductGrid';

export default function BrowsePage() {
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSearch = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchValue.toLowerCase());
        const matchesCategory = !selectedCategory || product.category.toLowerCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <section className="bg-white border-b border-gray-200 py-8">
                <div className="container mx-auto px-4 md:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
                    <p className="text-gray-600">Showing {filteredProducts.length} items</p>
                </div>
            </section>

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
