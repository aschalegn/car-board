const axios = require('axios'),
    perPage = 15;

const fetchCars = async () => {
    const data = await axios.get('https://private-anon-7e9b208978-carsapi1.apiary-mock.com/cars')
        .then(res => {
            if (res.status === 200) {
                return res.data
            }
        });
    return await data
}

const index = (req, res) => {
    fetchCars().then(cars => {
        req.session.filteredCars = cars;
        res.send({ pages: Math.ceil(cars.length / perPage), cars: cars.slice(0, perPage) });
    });
}

const pagenation = (req, res) => {
    const { page } = req.params;
    let start = page == 1 ? 0 : (page - 1) * perPage;
    const cartToPage = req.session.filteredCars.slice(start, page * perPage);
    res.send(cartToPage);
}

const filter = (req, res) => {
    const { year, manifacture, minPrice, maxPrice } = req.query;
    const { page } = req.params;
    fetchCars().then(cars => {
        if (!manifacture && !minPrice && !maxPrice && !year) {
            req.session.filteredCars = [];
        } else {
            req.session.filteredCars = cars.filter(car => {
                const filterByManifacture = manifacture ? car.make === manifacture : true
                const filterByYear = year ? car.year == year : true
                const filterByMinPrice = minPrice ? car.price > minPrice : true
                const filterByMaxPrice = maxPrice ? car.price < maxPrice : true
                return filterByManifacture && filterByYear && filterByMaxPrice && filterByMinPrice
            });
        }
        res.send({ pages: Math.ceil(req.session.filteredCars.length / perPage), cars: req.session.filteredCars.slice(0, perPage) });
    });
}

module.exports = { filter, index, pagenation };