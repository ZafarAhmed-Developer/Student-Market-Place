const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');

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

module.exports = router;
