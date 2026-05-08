const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['books', 'electronics', 'furniture', 'dorm', 'clothing', 'other'],
        },
        condition: {
            type: String,
            required: true,
            enum: ['new', 'like-new', 'used', 'fair'],
            default: 'used',
        },
        images: {
            type: [String],
            default: [],
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        location: {
            type: String,
            default: '',
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Full-text search index
productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
