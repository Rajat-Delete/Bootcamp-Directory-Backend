const NodeGeocoder = require('node-geocoder');
const { ServerConfig }  = require('../../config');
//console.log('process object',process.env);
const options = {
    provider : process.env.GEOCODER_PROVIDER || ServerConfig.GEOCODER_PROVIDER,
    httpAdapter : 'https',
    apiKey : process.env.GEOCODER_API_KEY || ServerConfig.GEOCODER_API_KEY,
    formatter : null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;