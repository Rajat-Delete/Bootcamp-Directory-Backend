const dotenv = require('dotenv');

dotenv.config();

//console.log('Process obj:',process);

module.exports = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    MONGODB_URI : process.env.MONGODB_URI,
}