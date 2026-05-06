import { useState } from 'react';
import { Link } from 'react-router-dom';

// ============ HEADER COMPONENT ============
export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="hidden sm:inline font-bold text-lg text-gray-900">
                        StudentHub
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                        Home
                    </Link>
                    <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                        Browse
                    </Link>
                    <Link to="/sell" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                        Sell
                    </Link>
                    {isAuthenticated && (
                        <Link to="/my-listings" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                            My Listings
                        </Link>
                    )}
                   
                    
                </nav>

                {/* Right Section - Auth Buttons */}
                <div className="flex items-center gap-4">
                    {!isAuthenticated ? (
                        <div className="hidden sm:flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                            >
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-sm font-medium text-gray-700">Profile</span>
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors rounded-t-lg"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/my-listings"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        My Listings
                                    </Link>
                                    <button
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                            Home
                        </Link>
                        <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                            Browse
                        </Link>
                        <Link to="/sell" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                            Sell
                        </Link>
                        {isAuthenticated && (
                            <Link to="/my-listings" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
                                My Listings
                            </Link>
                        )}

                        {!isAuthenticated && (
                            <div className="flex gap-2 mt-2">
                                <Link to="/login" className="flex-1">
                                    <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-center">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup" className="flex-1">
                                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}

// ============ FOOTER COMPONENT ============



export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-16 md:mt-24">
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
                {/* Main Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-4">StudentHub</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            A trusted marketplace for students to buy and sell items within their campus community.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/browse" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    Browse Items
                                </Link>
                            </li>
                            <li>
                                <Link to="/sell" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    Sell Item
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://wa.me/923071244873" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="mailto:zafarahmedbaloch@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    Safety Tips
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://www.linkedin.com/in/zafar-ahmed-a50a7a340"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[#0077b5] hover:text-white transition-all flex items-center justify-center text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>

                            <a
                                href="https://www.instagram.com/zafar73304"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[#e1306c] hover:text-white transition-all flex items-center justify-center text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div> {/* Grid Ends Here */}

                {/* Bottom Bar Section */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-sm">
                            © {currentYear} StudentHub. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ============ MAIN APPLAYOUT COMPONENT ============
export default function AppLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
