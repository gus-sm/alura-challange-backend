const router = require('express').Router(),
Connection  = require('../config/database/dbConnection')(),
bodyParser = require('body-parser'),

User = require('../controllers/Users')(Connection);

router.use(bodyParser.urlencoded({extended: true}));

router.get('/usuarios', User.listUsers);
router.post('/usuarios', User.deleteUser);

module.exports = router;