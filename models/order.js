const Joi = require("joi");
const mongoose = require("mongoose");
const itemModel = require("./item");
const userModel = require("./user");
const addressModel = require("./address");

const orderSchema = new mongoose.Schema({
  item: {
    type: itemModel.itemSchema,
    required: false
  },
  quantity: {
    type: Number,
    required: false
  },
  cost: {
    type: Number,
    required: false
  },
  address: {
    type: addressModel.addressSchema,
    required: false
  },
  buyer: {
    type: userModel.userSchema,
    required: false
  },
  seller: {
    type: userModel.userSchema,
    required: false
  },
  placedTime: {
    type: Date,
    required: false
  },
  confirmedTime: {
    type: Date,
    required: false
  },
  shipmentTime: {
    type: Date,
    required: false
  },
  receivedTime: {
    type: Date,
    required: false
  },
  paymentMode: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['new', 'confirmed', 'shipped', 'delivered'],
    required: false
  }
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    itemId: Joi.objectId().required(),
    quantity: Joi.number().optional(),
    cost: Joi.number().optional(),
    addressId: Joi.objectId().optional(),
    buyerId: Joi.objectId().required(),
    sellerId: Joi.objectId().required(),
    placedTime: Joi.string().required(),
    confirmedTime: Joi.string().optional(),
    shipmentTime: Joi.string().optional(),
    receivedTime: Joi.string().optional(),
    paymentMode: Joi.string().optional(),
    status: Joi.string().optional()
  };

  return Joi.validate(order, schema);
}

exports.orderSchema = orderSchema;
exports.Order = Order;
exports.validate = validateOrder;
