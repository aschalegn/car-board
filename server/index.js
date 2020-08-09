const express = require('express');
const app = express(),
    axios = require('axios'),
    perPage = 15;
let cars = [], filterdCars = [];

app.get("/cars", (req, res) => {
    filterdCars = cars;
    res.send({ pages: Math.ceil(filterdCars.length / perPage), cars: filterdCars.slice(0, perPage) });
});

app.get("/cars/:page", (req, res) => {
    const { page } = req.params;
    let start = page == 1 ? 0 : (page - 1) * perPage;
    const cartToPage = filterdCars.slice(start, page * perPage);
    res.send(cartToPage);
});

//Filter Route
app.get("/cars/filter/p", (req, res) => {
    const year = req.query.year,
        manifacture = req.query.manifacture,
        model = req.query.model;
    let result = [];
    if (manifacture && model && year) {
        result = cars.filter(car => {
            return car.make === manifacture && car.model === model && car.year == year;
        });
    }
    else if (manifacture && model) {
        return car.make === manifacture && car.model === model;
    }
    else if (manifacture && year) {
        result = cars.filter(car => {
            return car.make === manifacture && car.year == year;
        });
    }
    else if (manifacture) {
        result = cars.filter(car => {
            return car.make === manifacture;
        });
    }
    else if (year) {
        result = cars.filter(car => {
            return car.year == year;
        });
    } else {
        result = []
    }
    filterdCars = result
    res.send({ pages: Math.ceil(filterdCars.length / perPage), cars: filterdCars.slice(0, perPage) });
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
    console.log("server is listening on port 2000");
});