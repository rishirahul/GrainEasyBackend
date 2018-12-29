const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost/GrainEasyTestOne')
    .then(() => winston.info('Connected to MongoDB...'));
}