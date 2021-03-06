const express = require("express");
const router = express.Router();
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

    router.get('/', function(req, res, next) {
        let endDate = req.query.endDate;
        let startDate = req.query.startDate;
        nasaAPIHelper.fetchNEOs(startDate, endDate)
            .then((neos) => {
                console.log("neos from fetch", neos);
                return NEO.updateOrInsert(neos);
            })
            .then((updatedNEOsResponse) => {
                console.log("updated neos");
                res.json({
                    "success": `fetched ${updatedNEOsResponse.length} NEOs`
                });
            })
            .catch(next);
    });
    return router;
};
