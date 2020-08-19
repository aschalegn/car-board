const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
const { isUserExist, createNewUser } = require('./controllers/user')

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    done(null, id)
});

async function pfCallback(accessToken, refreshToken, profile, done) {
    const user = await isUserExist(profile.id, 'facebook')
    // if (user) {
    //     done(null, profile, { message: profile })
    // }
    // else {
    //     let user = await createNewUser(profile._json, 'facebook')
    //     done(null, profile, { message: profile })
    // }
    done(null, profile)
}

passport.use(new FacebookStrategy({
    clientID: process.env.App_Id,
    clientSecret: process.env.App_Secret,
    callbackURL: '/api/user/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
}, pfCallback));

