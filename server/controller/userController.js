const Inventory = require('../model/inventorySchema')
const Order = require('../model/ordersSchema')
const Payment = require('../model/paymentsSchema')
const Card = require('../model/cardSchema')

exports.orderItem = async (req, res, next) => {
  const payload = req.body;

  const { orderDetails, cardDetails } = payload;
  const totalItems = [];
  let totalQuantity = 0, totalPrice = 0;

  if (!orderDetails || !cardDetails) {
    return res.status(400).json({
      msg: 'Add Order and card details'
    })
  };

  const { cardNo, cvcNo, expiryMonth, expiryYear } = cardDetails;
  let mapResponse = 0;

  await Promise.all(
    orderDetails.map(async (orderItem) => {
      if( orderItem.quantity < 1 ){
        mapResponse = 4;
        return res.status(400).json({
          msg: `Quantity for ${orderItem.itemName} cannot be less than 1.`
        })
      }
      const itemResponse = await Inventory.findOne({
        "id": orderItem.itemId,
      })
      if (itemResponse === null) {
        mapResponse = 1
        return res.status(400).json({
          msg: `Item ${orderItem.itemName} not found`
        })
      }
      if (orderItem.quantity > itemResponse.quantity) {
        mapResponse = 2
        return res.status(400).json({
          msg: `Item ${itemResponse.itemName} is exceeding quantity`,
          availableQuantity: itemResponse.quantity
        })
      }
      await Inventory.findOneAndUpdate(
        { "id": orderItem.itemId },
        { $set: { "quantity": itemResponse.quantity - orderItem.quantity } }
      )
      totalItems.push(orderItem)
      totalQuantity += orderItem.quantity
      totalPrice += itemResponse.price * totalQuantity
    })
  )

  if (mapResponse > 0) {
    return
  }

  const cardResponse = await Card.findOne({
    "cardNo": cardNo,
  })

  if (cardResponse === null) {
    Card.create(cardDetails)
  }

  const orderedResponse = await Order.find();
  const orderedResponseLength = orderedResponse.length || 1;

  const newOrderDetails = await Order.create({
    OrderId: String(orderedResponseLength + 1),
    itemlist: totalItems,
    totalQuantity: totalQuantity,
    totalPrice: totalPrice,
  })

  const paymentCollectionResponse = await Payment.find();
  const paymentCollectionResponseLength = paymentCollectionResponse.length || 1;

  const transactionDetails = await Payment.create({
    TransactionId: String(paymentCollectionResponseLength + 1),
    amount: totalPrice,
    orderId: String(newOrderDetails.OrderId),
  })

  res.status(200).json({
    msg: 'Order successful',
    paymentStatus: 'Payment is done',
    cardDetails: cardDetails,
    transactionID: transactionDetails.TransactionId,
    orderId: transactionDetails.orderId
  })
}

exports.addItems = async (req, res, next) => {
  const card = new Card({
    cardNo: '1234567811112222',
    cvcNo: 595,
    expiryMonth: 7,
    expiryYear: 2026,
  })
  await card.save();

  const card2 = new Card({
    cardNo: '98765432555566666',
    cvcNo: 996,
    expiryMonth: 8,
    expiryYear: 2027,
  })
  await card2.save();

  const card3 = new Card({
    cardNo: '6666555544443333',
    cvcNo: 335,
    expiryMonth: 2,
    expiryYear: 2024,
  })
  await card3.save();

  const inventory = new Inventory({
    id: 1,
    quantity: 10,
    itemName: 'Iphone',
    price: 900,
  })
  await inventory.save();

  const inventory2 = new Inventory({
    id: 2,
    quantity: 50,
    itemName: 'Samsung',
    price: 750,
  })
  await inventory2.save();

  const inventory3 = new Inventory({
    id: 3,
    quantity: 30,
    itemName: 'Vivo',
    price: 200,
  })
  await inventory3.save();

  const order = new Order({
    OrderId: 'abc123',
    itemList: [{
      itemId: 1,
      quantity: 4,
      price: 25,
    }]
  })
  await order.save();

  const payment = new Payment({
    TransactionId: '123',
    amount: 100,
    orderId: 'abc123',
  })
  await payment.save();

  res.status(200).json({
    msg: 'Items added'
  })
}