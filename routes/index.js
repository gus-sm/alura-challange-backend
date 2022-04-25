const uploadRoute = require('./uploadRoute'),
userRegistration = require('./userRegistrationRoute'),
userList = require('./userListRoute'),
userEdit = require('./userEditRoute');

module.exports = (app) =>{
    app.use(uploadRoute, userRegistration, userList, userEdit);
}