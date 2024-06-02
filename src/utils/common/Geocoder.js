const NodeGeocoder = require('node-geocoder');
const { ServerConfig }  = require('../../config');
const options = {
    provider : ServerConfig.GEOCODER_PROVIDER,
    httpAdapter : 'https',
    apiKey : ServerConfig.GEOCODER_API_KEY,
    formatter : null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;