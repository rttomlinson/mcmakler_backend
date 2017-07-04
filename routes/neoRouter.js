const express = require("express");
const router = express.Router();
require('isomorphic-fetch');
const nasaAPIHelper = require('../helpers/nasaAPIHelper.js');
const moment = require('moment');

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

    router.get('/', function(req, res, next) {
        let endDate = req.query.endDate;
        let startDate = req.query.startDate;
        
        if (!(endDate && startDate)) {
            return next("Dates missing");
        }
        
        endDate = moment(req.query.endDate);
        startDate = moment(req.query.startDate);
        
        if (!(endDate.isValid() && startDate.isValid())) {
            return next("Invalid Dates");
        }

        endDate = endDate.format('YYYY-MM-DD');
        startDate = startDate.format('YYYY-MM-DD');
        let nasaUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${process.env.NASA_API_KEY}`;
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
                neos = nasaAPIHelper.cleanNEOs(neos.near_earth_objects);
                return NEO.updateOrInsert(neos);
            })
            .then(() => {
                res.json({
                    "success": "added new dates"
                });
            })
            .catch(next);
    });
    return router;
};
