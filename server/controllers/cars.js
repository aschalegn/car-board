const axios = require('axios'),
    perPage = 15;
let filteredCars = [];
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
        filteredCars = cars;
        res.send({ pages: Math.ceil(cars.length / perPage), cars: cars.slice(0, perPage) });
    });
}

module.exports.pagenation = (req, res) => {
    const { page } = req.params;
    let start = page == 1 ? 0 : (page - 1) * perPage;
    const cartToPage = filteredCars.slice(start, page * perPage);
    res.send(cartToPage);
}

module.exports.filter = (req, res) => {
    const { year, manifacture } = req.query;
    fetchCars().then(cars => {
        if (!manifacture && !model && !year) {
            filteredCars = [];
        } else {
            filteredCars = cars.filter(car => {
                const filterByManifacture = manifacture ? car.make === manifacture : true
                const filterByYear = year ? car.year == year : true
                return filterByManifacture && filterByYear
            });
        }
        res.send({ pages: Math.ceil(filteredCars.length / perPage), cars: filteredCars.slice(0, perPage) });
    });
}
