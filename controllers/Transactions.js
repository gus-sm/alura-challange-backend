const TransactionModel = require('../models/Transactions'),
config = require('../config/AppMessages');

const Transactions = (csvStreamReader, Connection) => {

    async function createTransaction(req, res) {
        try {
            await Connection.openConnection();
            const csv = csvStreamReader(req.file.path),
            csvData = await csv.read();
            
            if(csvData.length === 0)
                return res.status(400).render('index', {message: config.EMPTY_FILE_ERROR, error: true});
            
            const currentTransactionDate = csvData[0][7];

            if((await queryTransactions({dtTransac: currentTransactionDate})).length > 0){
                return res.status(400).render('index', {message: config.ALREADY_IMPORTED_ERROR, error: true});
            }

            for(let i=0; i<csvData.length; i++){
                let line = csvData[i];

                if(line.includes('') || line[7] !== currentTransactionDate)
                    continue;

                const transactionAttr = {
                    bcOrigem: line[0],
                    agOrigem: line[1],
                    contOrigem: line[2],
                    bcDest: line[3],
                    agDest: line[4],
                    contDest: line[5],
                    valTransac: parseFloat(line[6]),
                    dtTransac: new Date(line[7])
                };
    
                const transactionRegistry = new TransactionModel(transactionAttr);
    
                await transactionRegistry.save();
                await Connection.closeConnection();

            }

            return res.status(200).render('index', {message: req.message});

        } catch (err) {
            return res.status(500).render('index', {message: err, error: true});
        }
    }

    async function queryTransactions(condition = {}){
        try{
            return await TransactionModel.find(condition).exec();

        } catch(err){
            throw new Error(err);
        }

    }

    async function listTransactions(_, res) {
        try{
            await Connection.openConnection();
            const transactionRows = await queryTransactions();
            await Connection.closeConnection();
            return res.status(200).render('index', {transactions: transactionRows});

        } catch(err){
            return res.status(500).render('index',{message: err, error: true});
        }
    }

    return {
        createTransaction,
        listTransactions
    };
}

module.exports = Transactions;