const Joi = require('joi');
const mongoose = require('mongoose');
const stateModel = require('./state');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  state: {
    type: stateModel.stateSchema,
    required: true
  }, 
});

const City = mongoose.model('City', citySchema);

function validateCity(city) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    state: Joi.Object().required()
  };

  return Joi.validate(city, schema);
}

exports.citySchema = citySchema;
exports.City = City; 
exports.validate = validateCity;