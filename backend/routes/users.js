const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @desc    Create a new review for a seller
// @route   POST /api/users/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const sellerId = req.params.id;
        const userId = req.user._id;

        if (sellerId === userId.toString()) {
            return res.status(400).json({ message: "You cannot rate yourself" });
        }

        const seller = await User.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        const alreadyReviewed = await Review.findOne({ user: userId, seller: sellerId });

        if (alreadyReviewed) {
            return res.status(400).json({ message: "You have already rated this seller" });
        }

        const review = await Review.create({
            name: req.user.name,
            rating: Number(rating),
            comment: comment || '',
            user: userId,
            seller: sellerId,
        });

        // Update seller average rating
        const reviews = await Review.find({ seller: sellerId });
        seller.numReviews = reviews.length;
        seller.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await seller.save();

        res.status(201).json({ message: "Review added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// @desc    Get all reviews for a seller
// @route   GET /api/users/:id/reviews
// @access  Public
router.get('/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ seller: req.params.id })
            .sort({ createdAt: -1 })
            .populate('user', 'name avatar');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.campus = req.body.campus || user.campus;

            if (req.body.password) {
                user.password = req.body.password;
            }

            if (req.file) {
                user.avatar = `/uploads/${req.file.filename}`;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                campus: updatedUser.campus,
                avatar: updatedUser.avatar,
                token: req.headers.authorization.split(' ')[1], // Return the same token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
