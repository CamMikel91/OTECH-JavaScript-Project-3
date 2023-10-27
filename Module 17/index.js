require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`});
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const users = require('./routes/users.js');
const coupons = require('./routes/coupons.js');

app.use('/api/users', users);
app.use('/api/coupons', coupons);

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

console.log('Application Name: ' + config.get('name'));