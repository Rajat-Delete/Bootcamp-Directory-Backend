const dotenv = require('dotenv');

dotenv.config();

//console.log('Process obj:',process);

module.exports = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    MONGODB_URI : process.env.MONGODB_URI,
    GEOCODER_PROVIDER : process.env.GEOCODER_PROVIDER,
    GEOCODER_API_KEY : process.env.GEOCODER_API_KEY,
    MAX_FILE_UPLOAD : process.env.MAX_FILE_UPLOAD,
    FILE_UPLOAD_PATH : process.env.FILE_UPLOAD_PATH,
    JWT_PRIVATE_KEY : process.env.JWT_PRIVATE_KEY,
    JWT_TOKEN_EXPIRE : process.env.JWT_TOKEN_EXPIRE,
    JWT_COOKIE_EXPIRE : process.env.JWT_COOKIE_EXPIRE,
}