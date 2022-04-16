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
            if (err) {
                return res.render('error',{error: err});
             }
            return res.render('index');
             
        });
    }

    return {uploadForm, uploadHandler};
}

module.exports = uploadController;