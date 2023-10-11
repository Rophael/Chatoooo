const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: 6
    },
    img: {
        type: String,
    },

}, {
    timestamps: true,
});
module.exports = userSchema;

