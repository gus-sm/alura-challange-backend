const router = require('express').Router(),
uploadController = require('../controllers/uploadController')();

router.get('/', uploadController.uploadForm);
router.post('/', uploadController.uploadHandler);

module.exports = router;