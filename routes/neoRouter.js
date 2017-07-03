const express = require("express");
const router = express.Router();



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
            .then((neos) => {
                res.json({
                    "fastestNEO": neos[0]
                });

            });
    });
    
    return router;
};
