const multer  = require('multer'),
fileUpload= require('../middleware/uploadMiddleware'),
config = require('../config/config');


const uploadController = () => {
    function uploadForm(req, res){
        res.render('index');
    }

    function uploadHandler(req, res){
        upload = multer({
            storage: fileUpload.files.storage(), 
            fileFilter: fileUpload.files.allowedFile 
        }).single('filepond');

        upload(req, res, (err) => {
            let message = '';
            if (err) {
                message = err;
             } else{
                 message = config.SUCCESS_UPLOAD_MESSAGE;
             }
            req.file?
                console.log(`Nome do arquivo: ${req.file.originalname}\nTamanho: ${req.file.size}B`) : ''
            return res.render('index',{message: message});
             
        });
    }

    return {uploadForm, uploadHandler};
}

module.exports = uploadController;