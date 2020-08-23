const router = require('express').Router();
const passport = require('passport');
require('../conf');
const { signUp, signIN } = require('../controllers/user');

router.post('/signup', (req, res) => {
    signUp(req, res);
});

router.get('/login/:email/:password', (req, res) => {
    signIN(req, res);
});

//Facebook authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/cars',
    failureRedirect: '/signup'
}));

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid', 'carboard');
    res.redirect("/")
});

module.exports = router;