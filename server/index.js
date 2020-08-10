const express = require('express');
const app = express();
const { pagenation, filter, index } = require('./controllers/cars');

app.get("/cars", (req, res) => {
    index(req, res);
});

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