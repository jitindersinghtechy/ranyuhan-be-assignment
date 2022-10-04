const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    id: Number, 
    quantity: Number, 
    itemName: String,
    price: Number,
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports =  Inventory;
