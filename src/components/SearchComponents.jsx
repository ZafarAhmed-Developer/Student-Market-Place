import { useState } from 'react';

export function SearchBar({
    value,
    onChange,
    onSearch,
    placeholder = 'Search items...',
}) {
    return (
        <div className="relative w-full">
            <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') onSearch?.();
                }}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export function CategoryFilter({
    value,
    onChange,
    categories,
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
        >
            <option value="">All Categories</option>
            {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                    {cat.label}
                </option>
            ))}
        </select>
    );
}

export function FilterPanel({
    searchValue,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
    onSearch,
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-4">
            <SearchBar
                value={searchValue}
                onChange={onSearchChange}
                onSearch={onSearch}
                placeholder="Search items, sellers..."
            />

            <div className="hidden md:grid md:grid-cols-3 gap-4">
                <CategoryFilter
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    categories={categories}
                />
                <button
                    onClick={onSearch}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Search
                </button>
            </div>

            <div className="md:hidden flex gap-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors"
                >
                    Filters
                </button>
                <button
                    onClick={onSearch}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Search
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden space-y-4 border-t border-gray-200 pt-4">
                    <CategoryFilter
                        value={selectedCategory}
                        onChange={onCategoryChange}
                        categories={categories}
                    />
                </div>
            )}
        </div>
    );
}

