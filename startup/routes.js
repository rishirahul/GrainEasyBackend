const express = require('express');
const users = require('../routes/users');
const items = require('../routes/items');
const orders = require('../routes/orders');
const city = require('../routes/city');
const state = require('../routes/state');
const itemName = require('../routes/itemname');
const categories = require('../routes/categories');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:4200'
}

module.exports = function(app) {
  app.use(express.json());
  app.use(cors(corsOptions))
  app.use('/api/user', users);
  app.use('/api/category', categories);
  app.use('/api/item', items);
  app.use('/api/order', orders);
  app.use('/api/itemname', itemName);
  app.use('/api/city', city);
  app.use('/api/state', state);
  app.use('/api/auth', auth);
  app.use(error);
}
