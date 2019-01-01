const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const address = require('./address');
const category = require('./category');
const user = require('./user');
const itemname = require('./itemname');
const city = require('./city');

const itemSchema = new mongoose.Schema({
  name: {
    type: itemname.itemnameSchema,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: category.categorySchema,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  moisture: {
    type: Number,
    required: true
  },
  grainCount: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  sampleNo: {
    type: String,
    required: true
  },
  city: {
    type: city.citySchema,
    required: true
  },
  address: {
    type: address.addressSchema,
    required: false
  },
  seller: {
    type: user.userSchema,
    required: false
  },
  origin: {
    type: String,
    required: false
  },
  isLive: {
    type: Boolean,
    required: false
  }
});

const Item = mongoose.model('Item', itemSchema);

function validateItem(item) {
  const schema = {
    nameId: Joi.objectId().required(),
    image: Joi.string().required(),
    categoryId: Joi.objectId().required(),
    qty: Joi.number().required(),
    moisture: Joi.number().required(),
    grainCount: Joi.number().required(),
    grade: Joi.string().required(),
    sampleNo: Joi.string().required(),
    cityId: Joi.objectId().required(),
    addressId: Joi.objectId().optional(),
    sellerId: Joi.objectId().optional(),
    origin: Joi.string().optional(),
    isLive: Joi.string().optional(),
    // insurance: Joi.object().required(),
    // tax: Joi.object().required()
  };

  return Joi.validate(item, schema);
}

exports.itemSchema = itemSchema;
exports.Item = Item; 
exports.validate = validateItem;
