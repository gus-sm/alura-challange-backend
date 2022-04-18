const multer  = require('multer'),
<<<<<<< HEAD
fileUpload = require('../middleware/uploadMiddleware'),
csvStream = require('../helpers/csvStream'); 
=======
fileUpload= require('../middleware/uploadMiddleware'),
config = require('../config/config');

>>>>>>> 6c10445492629241497a983e27bbc9b35c8e800b

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
<<<<<<< HEAD
                return res.status(400).render('index',{message: message, error: true});
            }

            message = 'Arquivo aceito!';
            csvStream(req.file.path,function(data){console.log(data)});
            return res.status(200).render('index',{message: message});

=======
             } else{
                 message = config.SUCCESS_UPLOAD_MESSAGE;
             }
            req.file?
                console.log(`Nome do arquivo: ${req.file.originalname}\nTamanho: ${req.file.size}B`) : ''
            return res.render('index',{message: message});
             
>>>>>>> 6c10445492629241497a983e27bbc9b35c8e800b
        });
    }

    return {uploadForm, uploadHandler};
}

module.exports = uploadController;