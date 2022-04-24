const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true}
    },
    { timestamps: true }
);

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;