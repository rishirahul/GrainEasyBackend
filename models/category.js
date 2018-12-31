const Joi = require('joi');
const mongoose = require('mongoose');
const itemNameModel = require('./itemname');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  itemname: {
    type: itemNameModel.itemnameSchema,
    required: true
  }, 
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    itemnameId: Joi.objectId().required()
  };

  return Joi.validate(category, schema);
}

exports.categorySchema = categorySchema;
exports.Category = Category; 
exports.validate = validateCategory;