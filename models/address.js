const Joi = require('joi');
const mongoose = require('mongoose');
const cityModel = require('./city');

const addressSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  },
  city: {
    type: cityModel.citySchema,
    required: true
  },
  pin: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 8
  }

});

const address = mongoose.model('Address', addressSchema);

function validateAddress(address) {
  const schema = {
    name: Joi.string().min(5).max(500).required(),
    city: Joi.object().required(),
    pin: Joi.string().min(6).max(8).required()
  };

  return Joi.validate(address, schema);
}

exports.addressSchema = addressSchema;
exports.Address = address; 
exports.validate = validateAddress;