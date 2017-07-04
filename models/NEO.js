const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NEOSchema = new Schema({
    date: {
        type: Date
    },
    reference: {
        type: String
    },
    name: {
        type: String
    },
    speed: {
        type: Number
    },
    isHazardous: {
        type: Boolean
    }
}, {
    timestamps: true
});

/**
 * Returns the hazardous NEOs in the database
 * 
 **/

NEOSchema.statics.findHazardous = function findHazardous() {
    return this.find().where({
        "isHazardous": true
    });
};

/**
 * Returns the fastest NEO in the database
 * 
 **/

NEOSchema.statics.findFastest = function findFastest() {
    return this.find().limit(1).
    sort({
        speed: -1
    })
    .then((neos) => {
        //return just the first in the array
        return neos[0];
    });
};


const NEO = mongoose.model('NEO', NEOSchema);
module.exports = NEO;
