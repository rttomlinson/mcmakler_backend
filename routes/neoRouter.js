const express = require("express");
const router = express.Router();
require('isomorphic-fetch');
const nasaAPIHelper = require('../helpers/nasaAPIHelper.js');


module.exports = (mongoModels) => {
    const NEO = mongoModels.NEO;

    router.get('/hazardous', function(req, res) {
        NEO.findHazardous()
            .then((neos) => {
                res.json({
                    "potentiallyHazardousNEOs": neos
                });
            });
    });

    router.get('/fastest', function(req, res) {
        NEO.findFastest()
            .then((neo) => {
                res.json({
                    "fastestNEO": neo
                });

            });
    });

    router.get('/', function(req, res) {
        let nasaUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-06-01&end_date=2017-06-03&detailed=true&api_key=${process.env.NASA_API_KEY}`
        fetch(nasaUrl)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response;
            })
            .then((response) => {
                return response.json();
            })
            .then((neos) => {
                //Need to add each to the database
                return nasaAPIHelper.cleanNEOs(neos);
                neos = neos.map((neo) => {
    return new NEO(neo);
  });


  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving seeds...');
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
            })
            .then(() => {
                res.send("We got it!");
            })
            .catch((error) => {
                res.send(error);
            });
    });

    return router;
};
