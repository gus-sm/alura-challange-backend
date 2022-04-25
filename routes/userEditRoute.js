const router = require('express').Router(),
Connection  = require('../config/database/dbConnection')(),
bodyParser = require('body-parser'),

User = require('../controllers/Users')(Connection);

router.use(bodyParser.urlencoded({extended: true}));

router.get('/usuarios/:id', User.getUser);
router.post('/usuarios/:id', User.updateUser);

module.exports = router;