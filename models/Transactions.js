const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
    {
        id: {type: String},
        bcOrigem: {type: String, required: true},
        agOrigem: {type: String, required: true},
        contOrigem: {type: String, required: true},
        bcDest: {type: String, required: true},
        agDest: {type: String, required: true},
        contDest: {type: String, required: true},
        valTransac: {type: Number, required: true},
        dtTransac: {type: Date, required: true}
    },
    { timestamps: true }
);

const Transactions = mongoose.model('Transactions', TransactionSchema);

module.exports = Transactions;