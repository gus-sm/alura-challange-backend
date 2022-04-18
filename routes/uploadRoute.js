const router = require('express').Router(),
csvStreamReader= require('../helpers/csvStreamReader'); 
uploadController = require('../controllers/uploadController')(csvStreamReader);

router.get('/', uploadController.uploadFormView);
router.post('/', uploadController.uploadHandler);

module.exports = router;