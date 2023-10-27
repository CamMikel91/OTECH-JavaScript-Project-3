const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const {Coupon, validateCoupon} = require('../models/coupon');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();
router.use(express.json());

// Create New Coupon
router.post('/', adminAuth, async (req, res) => {
    // Validate Coupon
    const {error} = validateCoupon(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if Coupon already exists
    let coupon = await Coupon.findOne({code: req.body.code});
    if (coupon) return res.status(400).send('Coupon already exists.');

    // Create Coupon
    coupon = new Coupon({
        code: req.body.code,
        discount: req.body.discount,
        details: req.body.details,
        active: req.body.active
    });

    // Save Coupon
    await coupon.save();

    // Send Response
    res.send(coupon);
});


// Get All Coupons
router.get('/', auth, async (req, res) => {
    const coupons = await Coupon.find().sort('code');
    res.send(coupons);
});

// Update Coupon
router.put('/:id', adminAuth, async (req, res) => {
    // Validate Coupon
    const {error} = validateCoupon(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if Coupon exists
    let coupon = await Coupon.findOne({code: req.body.code});
    if (!coupon) return res.status(400).send('Coupon not found.');

    // Update Coupon
    coupon = await Coupon.findByIdAndUpdate(req.params.id, {
        code: req.body.code,
        discount: req.body.discount,
        details: req.body.details,
        active: req.body.active
    }, {new: true});

    // Send Response
    res.send(coupon);
});

// Delete Coupon
router.delete('/:id', adminAuth, async (req, res) => {
    // Check if Coupon exists
    const coupon = await Coupon.findByIdAndRemove(req.params.id);
    if (!coupon) return res.status(400).send('Coupon not found.');

    // Send Response
    res.send(coupon);
});

module.exports = router;