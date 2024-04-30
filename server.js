const http  =require('http');

const todosList = [
    {'TaskName':'Task1', 'Priority': 'P1' },
    {'TaskName':'Task2', 'Priority': 'P2' },
    {'TaskName':'Task3', 'Priority': 'P3' },
]

const responsecode = 200;
const server = http.createServer((request,response)=>{
    //console.log('Incoming request is', request);
    // response.setHeader('X-Powered-by','Nginx');
    // response.setHeader('Content-Type','application/json');
    //console.log(request.headers.authorization);

    

    let data = [];
    request.on('data',(chunk)=>{
        data.push(chunk);
    }).on('end',()=>{
        console.log(data.toString());
    })

    response.writeHead(responsecode, {
        'X-Powered-by':'Nginx',
        'Content-Type':'application/json'
    });
    response.write(JSON.stringify({'Success' : true,'Data' : todosList}));
    response.end();
});



const PORT = 5001;

server.listen(PORT, ()=>{
    console.log(`Server started on PORT number: ${PORT}`);
});


