const express =  require('express');
const {ServerConfig,LoggerConfig,ConnectDB } = require('./config');

ConnectDB();

const app = express();
const approutes = require('./routes');
const PORT = ServerConfig.PORT||5002;
app.use(express.json());
app.use('/api',approutes);

// app.use('/',(request,response)=>{
//     response.status(200).json({'Success' : 'True'});
// })

const server = app.listen(PORT , (request,response)=>{
    console.log(`Server is up on ${PORT} in ${ServerConfig.NODE_ENV}`);
    if(ServerConfig.NODE_ENV === 'development'){
        LoggerConfig.info('Successfully stared the Server',{});
    }
});

//unhandled promises handling
//This is a Global handler as if a process fails the sever will close with status as 1.
process.on('unhandledRejection',(error,promise)=>{
    console.log(`Error : ${error.message}`);
    server.close(()=>process.exit(1));
})