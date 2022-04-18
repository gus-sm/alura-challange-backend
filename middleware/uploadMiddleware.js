const multer = require('multer');

module.exports.files = {
    storage: function () {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        })

        return storage;
    },
    allowedFile: function (req, file, cb) {
        if (!file.originalname.match(/\.(csv)$/)) {
            return cb(new Error("Apenas arquivos CSV são aceitos!"));
        }
        cb(null, true);
    }
}