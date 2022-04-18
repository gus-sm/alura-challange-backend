const multer = require('multer'),
config = require('../config/config');

module.exports.files = {
    storage: function () {
        const storage = multer.diskStorage({
            destination: function (_, _, cb) {
                cb(null, './uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        })

        return storage;
    },
    allowedFile: function (_, file, cb) {
        if (!file.originalname.match(/\.(csv)$/)) {
            return cb(new Error(config.NOT_ACCEPTED_ERROR));
        }
        cb(null, true);
    }
}