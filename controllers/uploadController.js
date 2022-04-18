const multer  = require('multer'),

fileUpload = require('../middleware/uploadMiddleware'),
csvStream = require('../helpers/csvStream'); 

config = require('../config/config');


const uploadController = () => {
    let message = '';
    function uploadForm(req, res){
        res.status(200).render('index');
    }


    function uploadHandler(req, res){
        const upload = multer({
            storage: fileUpload.files.storage(), 
            fileFilter: fileUpload.files.allowedFile 
        }).single('filepond');

        upload(req, res, (err) => {
            if (err) {
                message = err;
                return res.status(400).render('index',{message: message, error: true});
            }

            message = config.SUCCESS_UPLOAD_MESSAGE;

            req.file?
                console.log(`Nome do arquivo: ${req.file.originalname}\nTamanho: ${req.file.size}B`) : ''

            csvStream(req.file.path,function(data){console.log(data)});
            return res.status(200).render('index',{message: message});

        });
    }

    return {uploadForm, uploadHandler};
}

module.exports = uploadController;