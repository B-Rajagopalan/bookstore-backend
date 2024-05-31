const express = require('express');
const chalk = require('chalk');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(3000, () => {
    console.log(chalk.green('This app is running on port 3000'));
});