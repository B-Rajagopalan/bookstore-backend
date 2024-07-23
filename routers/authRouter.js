const express = require('express');
const User = require('../models/userModel');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const router = express.Router();

router.post('/login', async(req, res) => {
    const loginData = req.body;

    const user = await User.findOne({email:loginData.email});

    if(!user) {
        return res.status(500).send('Invalid Credentials');
    }

    bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
        if(!isMatch) {
            return res.status(500).send('Invalid Credentials');
        }
        const payload = {subject: user._id};
        const token = jwt.encode(payload, "123");
        return res.status(200).json(token);
    })
});

router.post('/register', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    user.save()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});

module.exports = {
    router,
    jwtAuth : // Reusable JWT Auth function
    function (req, res, next) {
        if(!req.header('authorization')) {
            return res.status(401).send('Missing Auth Header');
        }
    
        const tokenString = req.header('authorization');
        const token = tokenString.split(' ')[1];
    
        let payload = null;
        
        if(token != 'null') {
            try {
                payload = jwt.decode(token, "123");
            }
            catch(e) {
                return res.status(401).send('Invalid token')
            }
        }
    
        if(!payload) {
            return res.status(401).send('Missing token');
        }
    
        req.userId = payload.subject;
        next();
    }
};