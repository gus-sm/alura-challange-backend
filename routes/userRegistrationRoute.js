const router = require('express').Router(),
bodyParser = require('body-parser'),
Connection  = require('../config/database/dbConnection')(),

User = require('../controllers/Users')(Connection);

router.use(bodyParser.urlencoded({extended: true}));

router.get('/cadastro',(_, res)=>{
    res.status(200).render('userRegistration');
});

router.post('/cadastro', User.createUser);

module.exports = router;