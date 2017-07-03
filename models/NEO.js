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

NEOSchema.statics.findHazardous = function findHazardous() {
    return this.find().where({
            "isHazardous": true
        });
};

NEOSchema.statics.findFastest = function findFastest() {
    return this.find().limit(1).
    sort({
            speed: -1
        });
};


const NEO = mongoose.model('NEO', NEOSchema);
module.exports = NEO;