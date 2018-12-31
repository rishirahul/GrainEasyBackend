const Joi = require('joi');
const mongoose = require('mongoose');


const itemnameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

const ItemName = mongoose.model('ItemName', itemnameSchema);

function validateItemName(itemname) {
  const schema = {
    name: Joi.string().min(3).max(50).required()
  };

  return Joi.validate(itemname, schema);
}

exports.itemnameSchema = itemnameSchema;
exports.ItemName = ItemName; 
exports.validate = validateItemName;