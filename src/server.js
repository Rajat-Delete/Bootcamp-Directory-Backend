const express =  require('express');
const {ServerConfig,LoggerConfig} = require('./config');

const app = express();
app.use(LoggerConfig);
const approutes = require('./routes');
const PORT = ServerConfig.PORT;

app.use('/api',approutes);

// app.use('/',(request,response)=>{
//     response.status(200).json({'Success' : 'True'});
// })

app.listen(PORT , (request,response)=>{
    console.log(`Server is up on ${PORT} in ${ServerConfig.NODE_ENV}`);
});