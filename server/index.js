const express = require('express');
const app = express(),
    axios = require('axios'),
    perPage = 15;
let filterdCars = [];

const fetchCars = async () => {
    const data = await axios.get('https://private-anon-ab9cc9d997-carsapi1.apiary-mock.com/cars')
        .then(res => {
            if (res.status === 200) {
                // cars = res.data;
                return res.data
            }
        });
    return await data
}


app.get("/cars", (req, res) => {
    fetchCars().then(cars => {
        filterdCars = cars;
        res.send({ pages: Math.ceil(cars.length / perPage), cars: cars.slice(0, perPage) });
    });
});

app.get("/cars/:page", (req, res) => {
    const { page } = req.params;
    let start = page == 1 ? 0 : (page - 1) * perPage;
    const cartToPage = filterdCars.slice(start, page * perPage);
    res.send(cartToPage);
});

//Filter Route
app.get("/cars/filter/params", (req, res) => {
    const { year, manifacture, model} = req.query;
    let result = [];
    fetchCars().then(cars => {
        if (manifacture && model && year) {
            result = cars.filter(car => {
                return car.make === manifacture && car.model === model && car.year == year;
            });
        }
        else if (manifacture && model) {
            result = cars.filter(car => {
                return car.make === manifacture && car.model === model;
            });
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
        // result = cars.filter(car => {
        //     const filterByManifacture = manifacture ? car.make === manifacture : true
        //     const filterByModel = model ? car.model === model : true
        //     const filterByYear = year ? car.year == year : true
        //     return filterByManifacture && filterByModel && filterByYear
        // });

        filterdCars = result;
        res.send({ pages: Math.ceil(filterdCars.length / perPage), cars: filterdCars.slice(0, perPage) });
    })
});


app.listen(2000, () => {
    console.log("server is listening on port 2000");
});