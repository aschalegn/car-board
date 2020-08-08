const express = require('express');
const app = express(),
    axios = require('axios'),
    perPage = 10;
let cars = [];

app.get("/cars", (req, res) => {
    res.json(cars);
});

app.get("/cars/:page", (req, res) => {
    const { page } = req.params;
    let start = page == 1 ? 0 : (page - 1) * perPage;
    const cartToPage = cars.slice(start, page * perPage);
    res.json(cartToPage);
});

const fetchCars = () => {
    axios.get('https://private-anon-ab9cc9d997-carsapi1.apiary-mock.com/cars')
        .then(res => {
            if (res.status === 200) {
                cars = res.data;
            }
        });
}

fetchCars();

app.listen(2000, () => {
    console.log("server is listening on port 2000")
});