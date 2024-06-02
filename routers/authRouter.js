const express = require('express');
const User = require('../models/userModel')

const router = express.Router();

router.post('/login', async(req, res) => {
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return res.status(500).send('Invalid Credentials');
    }

    if(user.password === req.body.password) {
        return res.status(200).send(user);
    }
    res.status(500).send('Wrong Password');
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

module.exports = router;