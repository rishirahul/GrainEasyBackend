const auth = require('../middleware/auth');
const permit = require('../middleware/permissions');
const {Item, validate} = require('../models/item');
const {Category} = require('../models/category'); 
const {ItemName} = require('../models/itemname'); 
const {City} = require('../models/city'); 
const {User} = require('../models/user'); 
const {Address, validateAddress} = require('../models/address');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', async (req, res) => {
  console.log (req.query);
  const itemnameId = req.query.name;
  const catId = req.query.cat;
  const cityId = req.query.origin;
  const grade = req.query.grade;
  const price = req.query.price;

  filter = {};
  if (itemnameId) {
    filter['name._id'] = itemnameId;
  }
  if (catId) {
    filter['category._id'] = catId;
  }
  if (cityId) {
    filter['city._id'] = cityId;
  }
  if (grade) {
    filter['grade'] = grade;
  }
  if (!price || price == 'asc') {
    const item = await Item.find(filter).sort('price');
    res.send(item);
  }
  else {
    const item = await Item.find(filter).sort({'price':-1});
    res.send(item);
  }
});

router.post('/', [auth, permit('seller', 'admin')],  async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid customer.');

  const name = await ItemName.findById(req.body.nameId);
  if (!name) return res.status(400).send('Invalid category.');

  const city = await City.findById(req.body.cityId);
  if (!city) return res.status(400).send('Invalid category.');

  const address = await Address.findById(req.body.addressId);
  if (!address) return res.status(400).send('Invalid category.');

  const seller = await User.findById(req.body.sellerId);
  if (!seller) return res.status(400).send('Invalid category.');

  let itemObj = _.pick(req.body, ['image', 
  'qty', 'price', 'moisture', 'grainCount', 'grade', 'sampleNo', 'origin', 'isLive']);

  itemObj.category =  category;
  itemObj.name =  name;
  itemObj.city =  city;
  itemObj.address =  address;
  itemObj.seller =  seller;
  let item = new Item(itemObj);
  item = await item.save();
  
  res.send(item);
});

router.put('/:id', [auth, permit('seller', 'admin')], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const category = await Category.findOne({ name: req.body.category.name });
  if (!category) return res.status(400).send('Invalid customer.');

  const name = await ItemName.findById(req.body.nameId);
  if (!name) return res.status(400).send('Invalid category.');

  const city = await City.findById(req.body.cityId);
  if (!city) return res.status(400).send('Invalid category.');

  const address = await Address.findById(req.body.addressId);
  if (!address) return res.status(400).send('Invalid category.');

  const seller = await User.findById(req.body.sellerId);
  if (!seller) return res.status(400).send('Invalid category.');

  itemObj = _.pick(req.body, ['name', 'image', 
  'qty', 'price', 'moisture', 'grainCount', 'grade', 'sampleNo', 'origin', 'isLive']);

  itemObj.category =  category;
  itemObj.name =  name;
  itemObj.city =  city;
  itemObj.address =  address;
  itemObj.seller =  seller;
  
  const item = await Item.findByIdAndUpdate(req.params.id, itemObj, {
    new: true
  });

  if (!item) return res.status(404).send('The item with the given ID was not found.');
  
  res.send(item);
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  const item = await Item.findByIdAndRemove(req.params.id);

  if (!item) return res.status(404).send('The item with the given ID was not found.');

  res.send(item);
});

router.get('/:id', [auth], async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) return res.status(404).send('The item with the given ID was not found.');

  res.send(item);
});

module.exports = router;
