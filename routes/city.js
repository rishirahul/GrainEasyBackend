const auth = require('../middleware/auth');
const permit = require('../middleware/permissions');
const {City, validate} = require('../models/city');
const {State} = require('../models/state'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', async (req, res) => {
  const city = await City.find().sort('name');
  res.send(city);
});

router.post('/', [auth, permit('admin')], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const state = await State.findById(req.body.stateId);
  if (!state) return res.status(400).send('Invalid state.');

  let cityObj = _.pick(req.body, ['name']);
  cityObj.state = state;
  cityObj.loadingPerKg = 0;
  cityObj.unloadingPerKg = 0;
  cityObj.packagingPerKg = 0;

  let city = new City(cityObj);
  city = await city.save();
  
  res.send(city);
});

router.put('/:id', [auth, permit('admin')], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const city = await City.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!city) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(city);
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
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