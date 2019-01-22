const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const address = require('./address');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  phone: {
    type: String,
    required: true,
    minlength: 13,
    maxlength: 13
  },
  pan: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 50
  },
  GST: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 100
  },
  Addresses: {
    type: [address.addressSchema],
    required: false,
  },
  PocName: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 50
  },
  PocPhone: {
    type: String,
    required: false,
    minlength: 13,
    maxlength: 13
  },
  PocEmail: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 100
  },
  isAdmin: Boolean,
  isSeller: Boolean,
  isBuyer: Boolean,
  isEmpL0: Boolean,
  isEmpL1: Boolean
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, isSeller: this.isSeller, 
    isBuyer: this.isBuyer, isEmpL0: this.isEmpL0, isEmpL1: this.isEmpL1}, config.get('jwtPrivateKey'));
    // console.log(token);
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).optional().email(),
    password: Joi.string().min(8).max(255).required(),
    phone: Joi.string().length(13).required(),
    pan: Joi.string().min(5).max(50).optional(),
    GST: Joi.string().min(5).max(100).optional(),
    Addresses: Joi.array().optional(),
    PocName: Joi.string().min(5).max(50).optional(),
    PocPhone: Joi.string().length(13).optional(),
    PocEmail: Joi.string().min(5).max(255).optional().email(),
    isAdmin: Joi.boolean().optional(),
    isSeller: Joi.boolean().optional(),
    isBuyer: Joi.boolean().optional(),
    isEmpL0: Joi.boolean().optional(),
    isEmpL1: Joi.boolean().optional()
  };

  return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User; 
exports.validate = validateUser;
