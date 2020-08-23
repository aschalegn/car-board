const router = require('express').Router();
const { pagenation, filter, index } = require('../controllers/cars');
const { auth } = require('../controllers/user');

router.get("/", auth, (req, res) => {
    const isAuthorised = res.locals.isAuth;
    if (isAuthorised) index(req, res);
    else res.status(304).send("unAuthorised Access");
});

//pagination Route
router.get("/:page", auth, (req, res) => {
    const isAuthorised = res.locals.isAuth;
    if (isAuthorised) pagenation(req, res);
    else res.status(304).send("UnAuthorised Access");
});

//Filter Route
router.get("/filter/params", auth, (req, res) => {
    const isAuthorised = res.locals.isAuth;
    if (isAuthorised) filter(req, res);
    else res.status(304).send("unAuthorised Access");
});

module.exports = router;