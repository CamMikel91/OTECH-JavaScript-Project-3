const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// Coupon Schema
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
    unique: true
  },
  discount: {
    discountPercent: {
      type: Number,
      required: function () {
        return !this.discount.discountDollar;
      },
      min: 0,
      max: 100
    },
    discountDollar: {
      type: Number,
      required: function () {
        return !this.discount.discountPercent;
      },
      min: 0,
      max: 100
    }
  },
  details: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 255
  },
  active: {
    type: Boolean,
    default: false
  }
});

// Coupon Model
const Coupon = mongoose.model('Coupon', couponSchema);

// Validate Coupon
function validateCoupon(coupon) {
  const schema = Joi.object({
    code: Joi.string().min(3).max(64).required(),
    discount: Joi.object({
      discountPercent: Joi.number().min(0).max(100),
      discountDollar: Joi.number().min(0).max(100)
    }).or('discountPercent', 'discountDollar').required(),
    details: Joi.string().min(3).max(255),
    active: Joi.boolean().default(false)
  });

  return schema.validate(coupon);
}

exports.Coupon = Coupon;
exports.validateCoupon = validateCoupon;