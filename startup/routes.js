const express = require('express');
const users = require('../routes/users');
const items = require('../routes/items');
const categories = require('../routes/categories');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/categories', categories);
  app.use('/api/items', items);
  app.use('/api/auth', auth);
  app.use(error);
}