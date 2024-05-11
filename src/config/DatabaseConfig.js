const mongoose = require('mongoose');
const ServerConfig = require('./ServerConfig');

const connectDB = async()=>{
    console.log('Inside connectDB function',ServerConfig.MONGODB_URI);
    const conn = await mongoose.connect(ServerConfig.MONGODB_URI);
    console.log(`Database Connected : ${conn.connection.host}`);
}

module.exports = connectDB;