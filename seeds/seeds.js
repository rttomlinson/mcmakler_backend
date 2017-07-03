const nasaData = require("./nasaData");
const nasaAPIHelper = require("../helpers/nasaAPIHelper.js");

const NEO = require("../models").NEO;

module.exports = () => {

  // Seed NEOs from data...
  let neos;
  let near_earth_objects = nasaData.near_earth_objects;
  neos = nasaAPIHelper.cleanNEOs(near_earth_objects);
  neos = neos.map((neo) => {
    return new NEO(neo);
  });


  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');
  var promises = [];
  [
    neos,
    // Other models...
  ].forEach((collection) => {
    collection.forEach((model) => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};