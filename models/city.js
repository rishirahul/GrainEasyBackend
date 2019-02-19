const Joi = require('joi');
const mongoose = require('mongoose');
const stateModel = require('./state');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  loadingPerKg: {
    type: Number,
    required: false
  },
  unloadingPerKg: {
    type: Number,
    required: false
  },
  packagingPerKg: {
    type: Number,
    required: false
  },
  state: {
    type: stateModel.stateSchema,
    required: true
  }, 
});

const City = mongoose.model('City', citySchema);

function validateCity(city) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    loadingPerKg: Joi.number().optional(),
    unloadingPerKg: Joi.number().optional(),
    packagingPerKg: Joi.number().optional(),
    stateId: Joi.objectId().required()
  };

  return Joi.validate(city, schema);
}

exports.citySchema = citySchema;
exports.City = City; 
exports.validate = validateCity;