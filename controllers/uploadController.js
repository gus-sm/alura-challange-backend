var multer  = require('multer');
var fileUpload= require('../middleware/uploadMiddleware');

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
                 message = 'Arquivo aceito!';
             }
            req.file?
                console.log(`Nome do arquivo: ${req.file.originalname}\nTamanho: ${req.file.size}B`) : ''
            return res.render('index',{message: message});
             
        });
    }

    return {uploadForm, uploadHandler};
}

module.exports = uploadController;