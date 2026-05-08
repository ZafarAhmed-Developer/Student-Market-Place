// Base URL of the backend API
const API_BASE = 'http://localhost:5001/api';
export const IMAGE_BASE = 'http://localhost:5001';

// ── Helper: get auth token from localStorage ──────────────────────────────────
const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.token || null;
};

// ── Helper: build headers ─────────────────────────────────────────────────────
const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
});

// ── Generic request helper ────────────────────────────────────────────────────
const request = async (url, options = {}) => {
    const res = await fetch(`${API_BASE}${url}`, options);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
};

// ════════════════════════════════════════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════════════════════════════════════════

export const registerUser = (name, email, password, campus, phone) =>
    request('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, campus, phone }),
    });

export const loginUser = (email, password) =>
    request('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

export const getMe = () =>
    request('/auth/me', { headers: authHeaders() });

// ════════════════════════════════════════════════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Get all products with optional filters.
 * @param {Object} params - { category, condition, search, minPrice, maxPrice, sort }
 */
export const getProducts = (params = {}) => {
    const query = new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== '' && v !== undefined)
    ).toString();
    return request(`/products${query ? `?${query}` : ''}`);
};

export const getProductById = (id) => request(`/products/${id}`);

/**
 * Create a new product listing.
 * @param {Object} data - { title, description, price, category, condition, location }
 * @param {File[]} imageFiles - Array of File objects (max 5)
 */
export const createProduct = (data, imageFiles = []) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v));
    imageFiles.forEach((file) => form.append('images', file));
    return request('/products', {
        method: 'POST',
        headers: authHeaders(),
        body: form,
    });
};

/**
 * Update an existing product listing.
 * @param {string} id - Product ID
 * @param {Object} data - Fields to update
 * @param {File[]} newImages - New image files to append (max 5 total)
 */
export const updateProduct = (id, data, newImages = []) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v));
    newImages.forEach((file) => form.append('images', file));
    return request(`/products/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: form,
    });
};

export const deleteProduct = (id) =>
    request(`/products/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    });

export const getMyListings = () =>
    request('/products/user/my-listings', { headers: authHeaders() });

// ════════════════════════════════════════════════════════════════════════════════
// USERS
// ════════════════════════════════════════════════════════════════════════════════

export const getUserProfile = (id) => request(`/users/${id}`);

/**
 * Update current user's profile.
 * @param {Object} data - { name, campus, phone, password }
 * @param {File|null} avatarFile - Avatar image file
 */
export const updateProfile = (data, avatarFile = null) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v));
    if (avatarFile) form.append('avatar', avatarFile);
    return request('/users/profile', {
        method: 'PUT',
        headers: authHeaders(),
        body: form,
    });
};

export const submitReview = (sellerId, reviewData) =>
    request(`/users/${sellerId}/reviews`, {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
    });

export const getSellerReviews = (sellerId) =>
    request(`/users/${sellerId}/reviews`);
