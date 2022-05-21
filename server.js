const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

// Configure dotenv package
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;


//Express static file module
app.use(express.static(__dirname + '/assets'));

app.use(favicon(__dirname + '/views/favicon.ico'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/home.html', function (req, res) {
    res.sendFile('/Users/gabriele/Desktop/progetto_pwm/views/home.html');
});

app.get('/contact.html', function (req, res) {
    res.sendFile('/Users/gabriele/Desktop/progetto_pwm/views/contact.html');
});

app.get('/city_template/', function (req, res) {
    res.sendFile('/Users/gabriele/Desktop/progetto_pwm/views/city_template.html');
});

app.listen(port);
console.log('Server started at http://localhost:' + port);