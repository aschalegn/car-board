const router = require('express').Router();
const { pagenation, filter, index } = require('../controllers/cars');
const { auth } = require('../controllers/user');

router.get("/", (req, res) => {
    const isAuthorised = auth(req, res);
    if (isAuthorised) index(req, res);
    else res.status(304).send("unAuthorised Access");
});

//pagination Route
router.get("/:page", (req, res) => {
    const isAuthorised = auth(req, res);
    if (isAuthorised) pagenation(req, res);
    else res.status(304).send("unAuthorised Access");
});

//Filter Route
router.get("/filter/params", (req, res) => {
    const isAuthorised = auth(req, res);
    if (isAuthorised) filter(req, res);
    else res.status(304).send("unAuthorised Access");
});

module.exports = router;