const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName: {type: String, required:true},
    author: {type: String, required:true},
    publishedOn: {type: String, required:true}
});

module.exports = mongoose.model('Book', bookSchema);