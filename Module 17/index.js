require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`});
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const home = require('./routes/home.js');
const users = require('./routes/users.js');
const coupons = require('./routes/coupons.js');
const dashboard = require('./routes/dashboard.js');

console.log('Application Name: ' + config.get('name'));

// Set View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routers
app.use('/', home);
app.use('/api/users', users);
app.use('/api/coupons', coupons);
app.use('/api/dashboard', dashboard);

// Check for Evironment
if (!process.env.NODE_ENV) {
  console.log('FATAL ERROR: NODE_ENV not set');
  process.exit(1);
}

// Check for JWT Private Key
if (!config.get('tokenKey')) {
  console.error('FATAL ERROR: tokenKey is not defined.');
  process.exit(1);
}

// Start Server
app.listen(3000, () => {
  console.log(`Server is Listening on port: ${process.env.PORT}`);
});

// Connect to MongoDB
mongoose.connect(config.get('bcDatabase'))
    .then(() => console.log('Connected to DB...\n'))
    .catch(err => console.error('Could not connect to DB...', err));