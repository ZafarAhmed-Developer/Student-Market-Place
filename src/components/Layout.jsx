import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, User } from "lucide-react";
import { LoginForm, SignupForm } from "./AuthForms";
import { loginUser, registerUser } from "../api";

export function Header({ onOpenAuth, isAuthenticated }) {

    return (
        <header className="bg-[#f7f8f8] border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">SM</span>
                    </div>
                    <span className="font-bold text-lg text-gray-900 hidden sm:block">
                        Student Market Place
                    </span>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 mx-8 max-w-xl">
                    <div className="w-full flex items-center border bg-white rounded-lg overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search for products, categories..."
                            className="w-full px-4 py-2 outline-none text-sm"
                        />
                        <button className="bg-blue-600 px-4 py-2 text-white">
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 sm:gap-3">

                    {/* Sell button — opens auth modal if not logged in */}
                    {isAuthenticated ? (
                        <Link
                            to="/sell"
                            className="inline-flex items-center gap-1 px-5 py-1.5 bg-white text-[#002f34] font-bold rounded-full border-[5px] border-t-[#ffce32] border-r-[#3a77ff] border-b-[#23e5db] border-l-[#ffce32] hover:shadow-md transition-all"
                        >

                            + SELL
                        </Link>
                    ) : (
                        <button
                            onClick={() => onOpenAuth('signup', '/sell')}
                            className="inline-flex items-center gap-1 px-5 py-1.5 bg-white text-[#002f34] font-bold rounded-full border-[5px] border-t-[#ffce32] border-r-[#3a77ff] border-b-[#23e5db] border-l-[#ffce32] hover:shadow-md transition-all"
                        >
                            + SELL
                        </button>
                    )}

                    {!isAuthenticated ? (
                        <>
                            <button
                                onClick={() => onOpenAuth('login')}
                                className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors px-1"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => onOpenAuth('signup')}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/profile"
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                            <User size={16} />
                            <span className="hidden sm:inline">Profile</span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden px-4 pb-3">
                <div className="flex items-center border rounded-lg overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 text-sm outline-none"
                    />
                    <button className="bg-blue-600 px-3 py-2 text-white">
                        <Search size={16} />
                    </button>
                </div>
            </div>

            {/* Categories Navbar */}
            <div className="border-t border-gray-200 bg-white shadow-sm">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center gap-6 overflow-x-auto py-2.5 no-scrollbar">
                        <span className="text-xs font-bold text-gray-900 whitespace-nowrap uppercase tracking-wider">Categories:</span>
                        <Link to="/browse" className="text-sm font-medium text-gray-700 whitespace-nowrap hover:text-blue-600 transition-colors">All items</Link>
                        <Link to="/browse?category=books" className="text-sm font-medium text-gray-700 whitespace-nowrap hover:text-blue-600 transition-colors">Books</Link>
                        <Link to="/browse?category=electronics" className="text-sm font-medium text-gray-700 whitespace-nowrap hover:text-blue-600 transition-colors">Electronics</Link>
                        <Link to="/browse?category=furniture" className="text-sm font-medium text-gray-700 whitespace-nowrap hover:text-blue-600 transition-colors">Furniture</Link>
                        <Link to="/browse?category=dorm" className="text-sm font-medium text-gray-700 whitespace-nowrap hover:text-blue-600 transition-colors">Dorm Essentials</Link>
                    </div>
                </div>
            </div>
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
                                <span className="text-gray-400 text-sm cursor-default">Safety Tips</span>
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
                            <span className="text-gray-400 text-sm cursor-default">Privacy Policy</span>
                            <span className="text-gray-400 text-sm cursor-default">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ============ MAIN APPLAYOUT COMPONENT ============
export default function AppLayout({ children }) {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [redirectAfterAuth, setRedirectAfterAuth] = useState('/profile');
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

    // Open auth modal; optionally set where to redirect after success
    const openAuth = (mode, redirectTo = '/profile') => {
        setRedirectAfterAuth(redirectTo);
        setAuthModal(mode);
    };

    useEffect(() => {
        if (authModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [authModal]);

    const handleLoginSubmit = async (email, password) => {
        const data = await loginUser(email, password);
        return data;
    };

    const handleSignupSubmit = async (data) => {
        const result = await registerUser(
            data.name,
            data.email,
            data.password,
            data.campus || '',
            data.phone || ''
        );
        return result;
    };

    const handleAuthSuccess = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
        setAuthModal(null);
        navigate(redirectAfterAuth);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 relative">
            <Header onOpenAuth={openAuth} isAuthenticated={isAuthenticated} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />

            {/* Auth Modal Overlay */}
            {authModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setAuthModal(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                            <X size={24} />
                        </button>

                        {authModal === 'login' ? (
                            <LoginForm
                                onSubmit={handleLoginSubmit}
                                onSuccess={handleAuthSuccess}
                                onSwitchMode={() => setAuthModal('signup')}
                                isModal={true}
                            />
                        ) : (
                            <SignupForm
                                onSubmit={handleSignupSubmit}
                                onSuccess={handleAuthSuccess}
                                onSwitchMode={() => setAuthModal('login')}
                                isModal={true}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
