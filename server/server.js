var express = require('express');
var path = require('path');
var http = require('http');
var indexRouter = require('./routes/index');
var Order = require('./routes/order');
var cors = require('cors');
const mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/ecommerce-be-assignment';

mongoose
	.connect(url, { useNewUrlParser: true })
	.then(() => {
    console.log("DB creation here")
	})

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!!');
});

var app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/Order', Order);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.set('port', process.env.PORT || 3022);
server.listen(app.get('port'),
  function () {
    console.log("Express server listening on port " + app.get('port'));
  }
);

module.exports = app;
