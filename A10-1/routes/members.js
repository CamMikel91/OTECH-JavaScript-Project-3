const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());



// Post request to register a new member
router.post('/', async (req, res) => {
    try {
        let currentMembers = JSON.parse(fs.readFileSync('memberList.json', 'utf8'));
        let newMember = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await hashPassword(req.body.password)
        };

        // Check if the email is already in use
        for (let i = 0; i < currentMembers.length; i++) {
            const member = currentMembers[i];
            if (member.email === newMember.email) {
                res.status(400).sendFile(__dirname + '/static/registrationFailure.html');
                return;
            }
        }

        currentMembers.push(newMember);
        fs.writeFileSync('memberList.json', JSON.stringify(currentMembers));
        res.status(200).sendFile(__dirname + '/static/registrationSuccess.html');
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// Post request to login a member
router.post('/login', async (req, res) => {
    try {
        const member = await authenticate(req.body.email, req.body.password);
        if (member) {
            res.status(200).sendFile(__dirname + '/static/loginSuccess.html');
        } else {
            res.status(401).sendFile(__dirname + '/static/loginFailure.html');
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// Get request to get the registration page
router.get('/register', (req, res) => {
    res.sendFile(__dirname + '/static/registration.html');
});

// Get request to get the login page
router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});

// Function to check if the email and password match
async function authenticate(email, password) {
    let currentMembers = JSON.parse(fs.readFileSync('memberList.json', 'utf8'));
    for (let i = 0; i < currentMembers.length; i++) {
        const member = currentMembers[i];
        if (member.email === email) {
            if (await bcrypt.compare(password, member.password)) {
                return member;
            }
        }
    }
    return null;
}

// Function to hash the password
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}


module.exports = router;