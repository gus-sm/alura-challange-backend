const uploadRoute = require('./uploadRoute'),
userRegistration = require('./userRegistration');

module.exports = (app) =>{
    app.use(uploadRoute, userRegistration);
}