const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    cardNo: Number,
    cvcNo: Number,
    expiryMonth: Number, 
    expiryYear: Number,
});

const Card = mongoose.model('Card', cardSchema);

module.exports =  Card;
