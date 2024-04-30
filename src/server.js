const express =  require('express');
const {ServerConfig} = require('./utils')

const app = express();

const PORT = ServerConfig.PORT;

app.listen(PORT , (request,response)=>{
    console.log(`Server is up on ${PORT} in ${ServerConfig.NODE_ENV}`);
});