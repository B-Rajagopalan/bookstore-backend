const express = require('express');
const chalk = require('chalk');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api/helloworld', (req, res) => {
    console.log('Hitted')
    res.send('Hello world');
});

app.listen(3000, () => {
    console.log(chalk.green('This app is running on port 3000'));
});