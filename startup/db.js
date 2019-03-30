const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://mongoadmin:mongoadminpass@localhost:27017/GrainEasyTestTwo?authSource=admin')
    .then(() => winston.info('Connected to MongoDB...'));
}