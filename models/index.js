const mongoose = require('mongoose');
const bluebird = require('bluebird');
//set bluebird as promise library for mongoose
mongoose.Promise = bluebird;

const models = {};

//load models
models.NEO = require('./NEO');


module.exports = models;
