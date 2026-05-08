const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, default: '' },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

// Prevent user from reviewing the same seller multiple times
reviewSchema.index({ user: 1, seller: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
