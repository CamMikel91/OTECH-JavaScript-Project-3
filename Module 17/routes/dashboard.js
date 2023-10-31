const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/user');
const auth = require('../middleware/auth');
const {Coupon} = require('../models/coupon');

router.use(express.json());

// Get Dashboard
router.get('/', auth, async (req, res) => {
    const user = await User.findOne({_id:req.user._id}).select('-password');
    const coupons = await Coupon.find({active: "true"});
    res.render('dashboard', { user: user, coupons: coupons });
});

module.exports = router;