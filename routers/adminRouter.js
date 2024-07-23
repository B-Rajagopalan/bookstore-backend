const express = require('express');
const booksData = require('../data/books.json');
const Book = require('../models/bookModel');
const mongoose = require('mongoose');

const adminRouter = express.Router();

adminRouter.get('/postBooks', async(req, res) => {
    let db = mongoose.connection;
    await db.dropCollection('books');   

    for(let i=0;i<booksData.length;i++) {
        const book = new Book({
            bookName: booksData[i]['bookName'],
            author: booksData[i]['author'],
            publishedOn: booksData[i]['publishedOn'],
        });
    
        await book.save()
            .catch(() => {
                return res.sendStatus(500);
            });
    }
    return res.status(200).send(booksData);
});

module.exports = adminRouter;