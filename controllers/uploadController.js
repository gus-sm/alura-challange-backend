const multer  = require('multer'),
fileUpload = require('../middleware/uploadMiddleware'),
csvStream = require('../helpers/csvStream'); 

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

            message = 'Arquivo aceito!';
            csvStream(req.file.path,function(data){console.log(data)});
            return res.status(200).render('index',{message: message});

        });
    }

    return {uploadForm, uploadHandler};
}

module.exports = uploadController;