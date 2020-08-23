const express = require('express'),
    passport = require('passport'),
    path = require('path');
const app = express(),
    session = require('express-session'),
    cors = require('cors'),
    mogoose = require('mongoose'),
    cookieParser = require('cookie-parser');
require('dotenv').config();
const userRoute = require('./routes/user');
const carsRoute = require('./routes/cars');
const staticPath = 'client/build';

app.use(express.static(path.join(__dirname, '..', staticPath)));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())
app.use(session(
    {
        secret: 'car-board',
        resave: false,
        cookie: { maxAge: 72 * 60 * 60 * 1000 },
        cookie: { httpOnly: false },
        saveUninitialized: false
    }
));
app.use('/api/user', userRoute);

app.use('/api/cars', carsRoute);

const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
mogoose.connect(url + '/car_board', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(con => console.log("connected to mongo database"))
    .catch(error => console.log(error));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', staticPath, 'index.html'));
});

app.listen( process.env.PORT ||2000, () => {
    console.log("server is listening on port 2000");
});