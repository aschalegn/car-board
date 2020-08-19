const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    local: {
        email: String,
        password: String,
        name: String,
        profile_img: String
    },
    facebook: {
        id: String,
        email: String,
        name: String,
        profile_img: String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;