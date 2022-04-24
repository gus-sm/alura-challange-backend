const router = require('express').Router(),
      csvStreamReader= require('../helpers/csvStreamReader'),
      Connection  = require('../database/dbConnection')(),
      Upload = require('../controllers/Upload')(),
      Transaction = require('../controllers/Transactions')(csvStreamReader, Connection);

router.get('/', Transaction.listTransactions);
router.post('/upload', Upload.uploadHandler, Transaction.createTransaction);

module.exports = router;