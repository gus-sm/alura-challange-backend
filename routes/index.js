const uploadRoute = require('./uploadRoute');

module.exports = (app) =>{
    app.use(uploadRoute);
}