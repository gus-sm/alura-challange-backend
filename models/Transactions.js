const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
    {
        id: {type: String},
        bcOrigem: {type: String},
        agOrigem: {type: String},
        contOrigem: {type: String},
        bcDest: {type: String},
        agDest: {type: String},
        contDest: {type: String},
        valTransac: {type: Number},
        dtTransac: {type: Date}
    },
    { timestamps: true }
);

const Transactions = mongoose.model('Transactions', TransactionSchema);

module.exports = Transactions;