const express = require("express");
const app = express();

//set environmental variables
require('dotenv');

const NEO = require('./models').NEO;

app.get('/neo/hazardous', function(req, res) {
    NEO.findHazardous()
        .then((neos) => {
            res.json({
                "potentiallyHazardousNEOs": neos
            });
        });
});

app.get('/neo/fastest', function(req, res) {
    NEO.findFastest()
        .then((neos) => {
            res.json({
                "fastestNEO": neos[0]
            });

        });
});

app.get('/', function(req, res) {
    res.json({
        "hello": "world"
    });
});

const port = process.env.PORT || 8080;
// If we're running this file directly
// start up the server
if (require.main === module) {
    app.listen(port, function() {
        console.log(`Example app listening on port ${port}!`);
    });
}

module.exports = app;
