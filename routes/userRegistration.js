const router = require('express').Router();
const User = require('../controllers/Users')();


router.get('/cadastro',(req, res)=>{
    res.status(200).render('userRegistration');
});

router.post('/cadastro', User.genPassword);

module.exports = router;