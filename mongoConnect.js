const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';

const config = require('./config/mongo')[env];

module.exports = () => {
    //see if production env is available
    const envUrl = process.env[config.use_env_variable];
    const localUrl = `mongodb://${config.host}/${config.databaes}`;
    //if productionUrl exists, use it, otherwise assume localUrl
    const mongoUrl = envUrl ? envUrl : localUrl;
    return mongoose.connect(mongoUrl);
};