const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const address = require('./address');
const category = require('./category');
const user = require('./user');


const itemSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  //   minlength: 3,
  //   maxlength: 50
  // },
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
    type: Number,
    required: true
  },
  sampleNo: {
    type: Number,
    required: true
  }
  // location: {
  //   type: address.addressSchema,
  //   required: true
  // }
  // seller: {
  //   type: user.userSchema,
  //   required: true
  // }
  // tax: {
  //   type: Number,
  //   required: true
  // }
  // origin: {
  //   type: Number,
  //   required: true
  // }
  // isLive: {
  // }
});

const Item = mongoose.model('Item', itemSchema);

function validateItem(item) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    image: Joi.string().required(),
    category: Joi.object().required(),
    qty: Joi.number().required(),
    moisture: Joi.number().required(),
    grainCount: Joi.number().required(),
    grade: Joi.number().required(),
    sampleNo: Joi.number().required(),
    // location: Joi.object().required(),
    // seller: Joi.object().required(),
    // insurance: Joi.object().required(),
    // tax: Joi.object().required()
  };

  return Joi.validate(item, schema);
}

exports.itemSchema = itemSchema;
exports.Item = Item; 
exports.validate = validateItem;