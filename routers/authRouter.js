const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
    req.body.message = "Hello from server login!";
    res.json(req.body);
});

router.post('/register', (req, res) => {
    res.send('Hello from server register!');
});

module.exports = router;