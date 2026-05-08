const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// ─── GET /api/users/:id ────────────────────────────────────────────────────────
// Public — get user public profile
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password -email');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── PUT /api/users/profile ────────────────────────────────────────────────────
// Protected — update own profile (name, campus, phone, avatar)
router.put('/profile', protect, upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { name, campus, phone, password } = req.body;

        if (name) user.name = name;
        if (campus !== undefined) user.campus = campus;
        if (phone !== undefined) user.phone = phone;
        if (password) user.password = password; // pre-save hook will hash it
        if (req.file) user.avatar = `/uploads/${req.file.filename}`;

        const updated = await user.save();
        res.json({
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            campus: updated.campus,
            phone: updated.phone,
            avatar: updated.avatar,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
