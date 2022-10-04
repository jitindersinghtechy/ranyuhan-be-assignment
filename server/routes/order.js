const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();


router.post('/', userController.orderItem)
router.post('/add', userController.addItems)


module.exports = router;