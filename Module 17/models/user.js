const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

// User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
	lowercase: true
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
	lowercase: true
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
	lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// Generate Auth Token
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('tokenKey'), { expiresIn: '15min' });
  return token;
}

// User Model
const User = mongoose.model('User', userSchema);

// Validate User
function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(64).required(),
    lastName: Joi.string().min(3).max(64).required(),
    email: Joi.string().min(3).max(64).required().email(),
    password: Joi.string().min(3).max(1024).required(),
    isAdmin: Joi.boolean().default(false)
  });

  return schema.validate(user);
}

// Validate User for Login
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(64).required().email(),
    password: Joi.string().min(3).max(1024).required()
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;