const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    TransactionId: String, 
    amount: Number, 
    orderId: String,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports =  Payment;
