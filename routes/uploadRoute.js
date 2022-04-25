const router = require('express').Router(),
csvStreamReader= require('../helpers/csvStreamReader'),
Connection  = require('../config/database/dbConnection')(),

Upload = require('../controllers/Uploads')(),
Transaction = require('../controllers/Transactions')(csvStreamReader, Connection);

router.get('/upload', Transaction.listTransactions);
router.post('/upload', Upload.uploadHandler, Transaction.createTransaction);

module.exports = router;