const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
const { isUserExist, createNewUser } = require('./controllers/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});

async function pfCallback(accessToken, refreshToken, profile, done) {
    const user = await isUserExist(profile.id, 'facebook')
    if (user) done(null, profile);

    else {
        let user = await createNewUser(profile._json, 'facebook');
        done(null);
    }
}

passport.use(new FacebookStrategy({
    clientID: process.env.App_Id || '307452433930733',
    clientSecret: process.env.App_Secret || '391a048f24ae112c761f0ff0872105fc',
    callbackURL: '/api/user/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
}, pfCallback));

