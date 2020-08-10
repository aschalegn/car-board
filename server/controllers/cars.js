const axios = require('axios'),
    perPage = 15;
let filterdCars = [];

const fetchCars = async () => {
    const data = await axios.get('https://private-anon-ab9cc9d997-carsapi1.apiary-mock.com/cars')
        .then(res => {
            if (res.status === 200) {
                return res.data
            }
        });
    return await data
}

module.exports.index = (req, res) => {
    fetchCars().then(cars => {
        filterdCars = cars;
        res.send({ pages: Math.ceil(cars.length / perPage), cars: cars.slice(0, perPage) });
    });
}

module.exports.pagenation = (req, res) => {
    const { page } = req.params;
    let start = page == 1 ? 0 : (page - 1) * perPage;
    const cartToPage = filterdCars.slice(start, page * perPage);
    res.send(cartToPage);
}

module.exports.filter = (req, res) => {
    const { year, manifacture, model } = req.query;
    fetchCars().then(cars => {
        if (!manifacture && !model && !year) {
            filterdCars = [];
        } else {
            filterdCars = cars.filter(car => {
                const filterByManifacture = manifacture ? car.make === manifacture : true
                const filterByModel = model ? car.model === model : true
                const filterByYear = year ? car.year == year : true
                return filterByManifacture && filterByModel && filterByYear
            });
        }

        res.send({ pages: Math.ceil(filterdCars.length / perPage), cars: filterdCars.slice(0, perPage) });
    });
}
