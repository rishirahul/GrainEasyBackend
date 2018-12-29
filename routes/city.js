const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {City, validate} = require('../models/city');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const city = await City.find().sort('name');
  res.send(city);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let city = new City({ name: req.body.name });
  city = await city.save();
  
  res.send(city);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const city = await City.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!city) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(city);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const city = await City.findByIdAndRemove(req.params.id);

  if (!city) return res.status(404).send('The genre with the given ID was not found.');

  res.send(city);
});

router.get('/:id', async (req, res) => {
  const city = await City.findById(req.params.id);

  if (!city) return res.status(404).send('The genre with the given ID was not found.');

  res.send(city);
});

module.exports = router;