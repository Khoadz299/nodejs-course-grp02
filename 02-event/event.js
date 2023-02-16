const EventEmitter = require("events")
const http = require('http');
class Sales extends  EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();
myEmitter.on("newSale", (val) => {
    console.log("On newSale", val);
});
myEmitter.on("newSale", (val) => {
    console.log("On newSale 2", val);
});
myEmitter.on("newSale", (val) => {
    console.log("On newSale 3", val);
});


myEmitter.emit("newSale", 100);


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('on request 1');
    res.end("Hello from server!!!");
});

server.on('request', (req, res) => {
    console.log('on request 2');
});
server.on('request', (req, res) => {
    console.log('on request 3');
});

server.listen(8080, () => {
    console.log("server listen at 8080");
});















