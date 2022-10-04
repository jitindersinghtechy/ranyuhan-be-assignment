const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    OrderId: String,
    itemList: [{
        quantity: Number,
        itemName: String,
        price: Number,
    }],
    totalQuantity: Number,
    totalPrice: Number,
});

const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;
