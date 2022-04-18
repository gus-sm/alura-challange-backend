<<<<<<< HEAD
const multer = require('multer');
=======
const multer = require('multer'),
config = require('../config/config');
>>>>>>> 6c10445492629241497a983e27bbc9b35c8e800b

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
<<<<<<< HEAD
            return cb(new Error("Apenas arquivos CSV são aceitos!"));
=======
            return cb(new Error(config.NOT_ACCEPTED_ERROR));
>>>>>>> 6c10445492629241497a983e27bbc9b35c8e800b
        }
        cb(null, true);
    }
}