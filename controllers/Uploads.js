const multer  = require('multer'),
fileUpload = require('../middleware/uploadSettings'),
config = require('../config/AppMessages');

const Upload = () => {
    let message = '';

    function uploadHandler(req, res, next){

        const upload = multer({
            storage: fileUpload.files.storage(), 
            fileFilter: fileUpload.files.allowedFile 
        }).single('filepond');

        upload(req, res, (err) => {
            if (err) {
                message = err;
                return res.status(400).render('index',{message: message, error: true});
            }
            if(!req.file){
                message = config.NO_FILE_ERROR;
                return res.status(400).render('index',{message: message, error: true});
            }
            req.message = config.TRANSACTION_SUCCESS_MESSAGE;
            next();
            //return res.status(200).render('index',{message: config.TRANSACTION_SUCCESS_MESSAGE});
        });
    }

    return {uploadHandler};
}

module.exports = Upload;