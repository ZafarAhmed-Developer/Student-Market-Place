const express = require('express');
const router = express.Router();
const UserSellList = require('../models/UserSellList');
const { protect } = require('../middleware/auth');

// @desc    Get sell list for a specific user
// @route   GET /api/user-sell-list/:userId
// @access  Public
router.get('/:userId', async (req, res) => {
    try {
        const sellList = await UserSellList.find({ user: req.params.userId })
            .populate('product', 'title price images category');
        res.json(sellList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get my sell list
// @route   GET /api/user-sell-list/my/list
// @access  Private
router.get('/my/list', protect, async (req, res) => {
    try {
        const sellList = await UserSellList.find({ user: req.user._id })
            .populate('product', 'title price images category');
        res.json(sellList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;