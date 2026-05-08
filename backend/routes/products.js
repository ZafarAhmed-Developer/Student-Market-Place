const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const UserSellList = require('../models/UserSellList');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// ─── GET /api/products ─────────────────────────────────────────────────────────
// Public — browse all active products, with optional filters & search
router.get('/', async (req, res) => {
    try {
        const { category, condition, search, minPrice, maxPrice, sort } = req.query;
        const filter = { isActive: true };

        if (category) filter.category = category;
        if (condition) filter.condition = condition;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (search) filter.$text = { $search: search };

        let sortOption = { createdAt: -1 }; // newest first by default
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };

        const products = await Product.find(filter)
            .populate('seller', 'name campus phone avatar rating numReviews')
            .sort(sortOption);

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── GET /api/products/:id ─────────────────────────────────────────────────────
// Public — get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('seller', 'name campus phone avatar rating numReviews createdAt');

        if (!product || !product.isActive) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── POST /api/products ────────────────────────────────────────────────────────
// Protected — create a new product listing (with optional image upload)
router.post('/', protect, upload.array('images', 5), async (req, res) => {
    try {
        const { title, description, price, category, condition, location } = req.body;

        if (!title || !description || !price || !category) {
            return res.status(400).json({ message: 'Title, description, price and category are required' });
        }

        // Build image URL list from uploaded files
        const images = req.files
            ? req.files.map((f) => `/uploads/${f.filename}`)
            : [];

        const product = await Product.create({
            title,
            description,
            price: Number(price),
            category,
            condition: condition || 'used',
            images,
            seller: req.user._id,
            location: location || req.user.campus || '',
        });

        // Add to UserSellList
        await UserSellList.create({
            user: req.user._id,
            product: product._id,
            productName: product.title,
        });

        // Increment User sellCount
        const user = await User.findById(req.user._id);
        if (user) {
            await user.incrementSellCount();
        }

        await product.populate('seller', 'name campus phone avatar rating numReviews');
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── PUT /api/products/:id ─────────────────────────────────────────────────────
// Protected — update own product
router.put('/:id', protect, upload.array('images', 5), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this listing' });
        }

        const { title, description, price, category, condition, location, isActive } = req.body;

        if (title) {
            product.title = title;
            // Update UserSellList productName
            await UserSellList.findOneAndUpdate({ product: product._id }, { productName: title });
        }
        if (description) product.description = description;
        if (price !== undefined) product.price = Number(price);
        if (category) product.category = category;
        if (condition) product.condition = condition;
        if (location !== undefined) product.location = location;
        if (isActive !== undefined) product.isActive = isActive === 'true' || isActive === true;

        // Append new images if uploaded
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((f) => `/uploads/${f.filename}`);
            product.images = [...product.images, ...newImages].slice(0, 5);
        }

        const updated = await product.save();

        await updated.populate('seller', 'name campus phone avatar rating numReviews');
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── DELETE /api/products/:id ──────────────────────────────────────────────────
// Protected — delete own product
router.delete('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this listing' });
        }

        const sellerId = product.seller;
        await product.deleteOne();

        // Remove from UserSellList
        await UserSellList.deleteOne({ product: req.params.id });

        // Decrement User sellCount
        const user = await User.findById(sellerId);
        if (user) {
            await user.decrementSellCount();
        }

        res.json({ message: 'Listing deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── GET /api/products/user/my-listings ───────────────────────────────────────
// Protected — get all listings of the logged-in user
router.get('/user/my-listings', protect, async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user._id })
            .sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
