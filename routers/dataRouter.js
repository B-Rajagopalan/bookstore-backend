const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/bookModel');

const router = express.Router();

router.get('/books', async (req, res) => {
    const booksData = await Book.find({})
    return res.status(200).send(booksData)
})

module.exports = router;