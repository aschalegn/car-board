const express = require('express');
const app = express(), session = require('express-session')

const { pagenation, filter, index } = require('./controllers/cars');
app.use(session(
    {
        secret: 'car-board',
        resave: false,
        saveUninitialized: false
    }
))

app.get("/cars", (req, res) => {
    index(req, res);
});

//pagination Route
app.get("/cars/:page", (req, res) => {
    pagenation(req, res);
});

//Filter Route
app.get("/cars/filter/params", (req, res) => {
    filter(req, res);
});

app.listen(2000, () => {
    console.log("server is listening on port 2000");
});