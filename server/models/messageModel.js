const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true
        },
        seen: {
            type: Boolean,
            default: false
        }
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    users: Array
}, {
    timestamps: true
});
module.exports = messageSchema;