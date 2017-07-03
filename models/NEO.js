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

const NEO = mongoose.model('NEO', NEOSchema);

module.exports = NEO;