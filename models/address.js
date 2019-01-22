const Joi = require('joi');
const mongoose = require('mongoose');
const cityModel = require('./city');

const addressSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 500
  },
  city: {
    type: cityModel.citySchema,
    required: false
  },
  pin: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 8
  }
});

const address = mongoose.model('Address', addressSchema);

function validateAddress(address) {
  const schema = {
    text: Joi.string().min(5).max(500).optional(),
    city: Joi.object().optional(),
    pin: Joi.string().min(6).max(8).optional()
  };

  return Joi.validate(address, schema);
}

exports.addressSchema = addressSchema;
exports.Address = address; 
exports.validateAddress = validateAddress;