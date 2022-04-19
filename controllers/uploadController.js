const multer  = require('multer'),
fileUpload = require('../middleware/uploadMiddleware'),
config = require('../config/config');

const uploadController = (csvStreamReader, Connection) => {
    let message = '',

    dbConnection = Connection.openConnection();
    dbConnection.getDbConn();

    function uploadFormView(req, res){
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
            if(!req.file){
                message = config.NO_FILE_ERROR;
                return res.status(400).render('index',{message: message, error: true});
            }

            message = config.SUCCESS_UPLOAD_MESSAGE;


            csvStreamReader(req.file.path,function(data){
                console.log(data);
            });

            return res.status(200).render('index',{message: message});

        });
    }

    return {uploadFormView, uploadHandler};
}

module.exports = uploadController;