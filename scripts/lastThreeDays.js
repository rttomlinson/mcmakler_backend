require('dotenv').config();
//purpose of this file is to update the database with the last three days from the NASA API
const nasaAPIHelper = require('../helpers/nasaAPIHelper');
const moment = require('moment');
const NEO = require('../models').NEO;
//connect to the database
require('../mongoConnect')()
.then(() => {
    //fetch the data from the NASA API
    let todaysDate = moment().format('YYYY-MM-DD');
    let threeDaysAgo = moment().subtract(2, 'days').format('YYYY-MM-DD');
    return nasaAPIHelper.fetchNEOs(threeDaysAgo, todaysDate);
}) 
.then((neos) => {
    console.log("Number of NEOs returned from fetch", neos.length);
    //add the neos to the database using the static helper function
    return NEO.updateOrInsert(neos);
})
.then(() => {
    console.log("Completed update");
    process.exit(0);
})
.catch((error) => {
    console.log("An error occurred while updating the DB", error);
    process.exit(1);
})