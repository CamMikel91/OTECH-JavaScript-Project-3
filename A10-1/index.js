const express = require('express');
const app = express();
const port = 3000;

const membersRoute = require('./routes/members');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/members', membersRoute);

// Homepage redirects to login page
app.get('/', (req, res) => {
    // redirect to the login page
    res.redirect('/members/login');
});

app.listen(port, () => {
    console.log('Server listening on port ' + port + '...');
});