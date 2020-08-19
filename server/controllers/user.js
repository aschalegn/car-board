const jwt = require('jsonwebtoken'),
    bcryptjs = require('bcryptjs'),
    User = require('../model/User');
const cookieMaxAge = 72 * 60 * 60 * 1000;
const secretKey = process.env.JWT_KEY || "carboard";

//Sign up new user
const signUp = (req, res) => {
    let body = req.body;
    const user = isUserExist(body.email, 'email')
    if (user) {
        res.status(202).send("user Already exist pleas login");
    } else {
        createNewUser(body, 'local')
            .then(user => {
                jwt.sign({ email: user.email, password: user.password }, secretKey, (err, token) => {
                    if (err) throw err;
                    if (token) {
                        res.cookie("carboard", token, { maxAge: cookieMaxAge });
                        res.status(201).send("signed up successfully")
                    }
                });

            });
    }
}

//Create a new user
const createNewUser = async (info, method) => {
    let newUser;
    switch (method) {
        case 'facebook':
            newUser = new User({
                facebook: {
                    id: info.id,
                    email: info.email,
                    name: info.name,
                }
            });
            newUser.save();
            break;
        case 'local':
            newUser = new User({
                local: {
                    email: info.email,
                    name: info.name,
                    password: info.password
                }
            });
            const hashedPassword = await bcryptjs.hash(newUser.local.password, 10)
                .then(hash => {
                    return hash
                }).catch(err => {
                    throw err
                });
            newUser.local.password = hashedPassword;
            newUser.save();
            break;
        default:
            break;
    }
    return newUser;
}

//Login the user
const signIN = async (req, res) => {
    const { email, password } = req.params;
    const user = await isUserExist(email, 'email');
    if (!user)
        res.status(202).send("This email not in the system pleas signup");
    else {
        console.log(user);
        bcryptjs.compare(password, user.local.password, (err, match) => {
            if (err) throw err;
            if (match) {
                jwt.sign({ email: user.local.email, password: user.local.password }, secretKey, (err, token) => {
                    if (err) throw err;
                    if (token) {
                        console.log(token);
                        res.cookie("carboard", token, { maxAge: cookieMaxAge });
                        res.status(200).send("loged in successfully")
                    }
                });
            }
        });
    }
}

//Authenticate if user is loged in
const auth = (req, res) => {
    const localToken = req.cookies.carboard,
        fbToke = req.cookies['connect.sid'];
    if (localToken) {
        let payload = jwt.verify(token, tokenSecret);
        if (payload) return true;
    }
    else if (fbToke) return true;
    else return false;
}

//Check if email is exist in the system
const isUserExist = async (info, method) => {
    let exist;
    switch (method) {
        case 'email':
            exist = await User.findOne({ 'local.email': info })
                .then(user => {
                    if (user) return user;
                    else return false;
                }).catch(err => {
                    throw err
                });
            break;
        case 'facebook':
            exist = await User.findOne({ 'facebook.id': info })
                .then(user => {
                    if (user) return user;
                    else return false;
                }).catch(err => {
                    throw err
                });
            break
        default:
            break;
    }
    return exist
}

module.exports = { signUp, signIN, auth, isUserExist, createNewUser };