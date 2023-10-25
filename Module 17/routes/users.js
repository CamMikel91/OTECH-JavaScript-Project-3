const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, validateUser, validateLogin } = require('../models/user');
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');

router.use(express.json());

// Register User
router.post('/register', async (req, res) => {
    // Validate User
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if User already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    // Create User
    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save User
    await user.save();

    // Generate Auth Token
    const token = user.generateAuthToken();

    // Send Response
    res.header('x-auth-token', token).send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
});

// Login User
router.post('/login', async (req, res) => {
  	// Validate User
  	const { error } = validateLogin(req.body);
  	if (error) return res.status(400).send(error.details[0].message);

  	// Check if User exists
  	let user = await User.findOne({ email: req.body.email });
  	if (!user) return res.status(400).send('Invalid Email or Password.');

  	// Check Password
  	const validPassword = await bcrypt.compare(req.body.password, user.password);
  	if (!validPassword) return res.status(400).send('Invalid Email or Password.');

  	// Generate Auth Token
  	const token = user.generateAuthToken();

  	// Send Response
  	res.send(token);
});

// Get All Users
router.get('/', adminAuth, async (req, res) => {
  	const users = await User.find().sort('firstName');
  	res.send(users);
});

// Get User by ID
router.get('/:id', adminAuth, async (req, res) => {
  	const user = await User.findById(req.params.id);
  	if (!user) return res.status(400).send('User not found.');
  	res.send(user);
});

// Update User by ID
router.put('/:id', adminAuth, async (req, res) => {
  	// Check for Valid User ID
  	let user = await User.findById(req.params.id);
  	if (!user) return res.status(400).send('User not found.');
	
  	// Update User
  	user = await User.findByIdAndUpdate(req.params.id, {
  	  	firstName: req.body.firstName,
  	  	lastName: req.body.lastName,
  	  	email: req.body.email,
  	  	isAdmin: req.body.isAdmin
  	}, { new: true });

  	// Send Response
  	res.send({
  	  	_id: user._id,
  	  	firstName: user.firstName,
  	  	lastName: user.lastName,
  	  	email: user.email,
  	  	isAdmin: user.isAdmin
  	});
});

// Delete User by ID
router.delete('/:id', adminAuth, async (req, res) => {
  	// Check for Valid User ID
  	const user = await User.findById(req.params.id);
  	if (!user) return res.status(400).send('User not found.');

  	// Delete User
  	await User.findByIdAndRemove(req.params.id);

  	// Send Response
  	res.send(`User ${user.firstName} ${user.lastName} deleted.`);
});

module.exports = router;