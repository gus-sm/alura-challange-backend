const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        active: {type: Boolean, default: true}
    },
    { timestamps: true }
);

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;