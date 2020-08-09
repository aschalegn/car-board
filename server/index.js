const express = require('express');
const app = express(),
    axios = require('axios'),
    perPage = 15;
let cars = [],
    manifucturers = [];

app.get("/cars", (req, res) => {
    res.json(Math.round(cars.length / perPage));
});

app.get("/cars/:page", (req, res) => {

    const { page } = req.params;
    let start = page == 1 ? 0 : (page - 1) * perPage;
    const cartToPage = cars.slice(start, page * perPage);
    res.send(cartToPage);
});

app.get("/cars/filter/:year", (req, res) => {
    const { year } = req.params;
    const byYear = cars.filter(car =>
        car.year == year
    );
    res.send(byYear);
});

const fetchCars = () => {
    axios.get('https://private-anon-ab9cc9d997-carsapi1.apiary-mock.com/cars')
        .then(res => {
            if (res.status === 200) {
                cars = res.data;
            }
        });
}

const fetchMans = () => {
    axios.get('https://private-anon-ab9cc9d997-carsapi1.apiary-mock.com/manufacturers')
        .then(res => {
            if (res.status === 200) {
                const manNames = res.data.map(man => {
                    return man.name;
                });
                manifucturers = manNames
            }
        });
}

// let manModel = {}
// const filterByModel = () => {
//     fetchCars();
//     for (let i = 0; i < cars.length; i++) {
//         const car = cars[i];
//         if (!manModel[car.make]) {
//             manModel.car.make.madels.push(car.model);
//         }
//     }
//     console.log(cars);
// }

fetchCars();
// fetchMans();
// filterByModel();

const filetrByYear = (filter, res) => {
    fetchCars();
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        if (!manModel[car.make]) {
            manModel.car.make.madels.push(car.model);
        }
    }
    console.log(cars);
}


app.listen(2000, () => {
    console.log("server is listening on port 2000")
});