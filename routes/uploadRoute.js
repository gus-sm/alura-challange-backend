const router = require('express').Router(),
csvStreamReader= require('../helpers/csvStreamReader'),
Connection  = require('../config/dbConnection')();

uploadController = require('../controllers/uploadController')(csvStreamReader, Connection);

router.get('/', uploadController.uploadFormView);
router.post('/', uploadController.uploadHandler);

module.exports = router;