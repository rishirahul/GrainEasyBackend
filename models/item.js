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
    required: false
  },
  image: {
    type: String,
    required: false
  },
  category: {
    type: category.categorySchema,
    required: false
  },
  qty: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  moisture: {
    type: Number,
    required: false
  },
  grainCount: {
    type: Number,
    required: false
  },
  grade: {
    type: String,
    required: false
  },
  sampleNo: {
    type: String,
    required: false
  },
  city: {
    type: city.citySchema,
    required: false
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
    price: Joi.number().required(),
    moisture: Joi.number().required(),
    grainCount: Joi.number().required(),
    grade: Joi.string().required(),
    sampleNo: Joi.string().required(),
    cityId: Joi.objectId().required(),
    addressId: Joi.objectId().required(),
    sellerId: Joi.objectId().required(),
    origin: Joi.string().optional(),
    isLive: Joi.string().optional()
  };

  return Joi.validate(item, schema);
}

exports.itemSchema = itemSchema;
exports.Item = Item; 
exports.validate = validateItem;
