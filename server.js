const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bookstore:ayjpbsQxTYmI2BOi@bookstoredb.bvp6pj9.mongodb.net/?retryWrites=true&w=majority&appName=bookstoreDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

//cors not needed since we use proxy config in angular
//app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRouter);

app.get('/api/helloworld', (req, res) => {
    res.send('Hello world');
});

app.listen(3000, () => {
    console.log(chalk.green('This app is running on port 3000'));
});