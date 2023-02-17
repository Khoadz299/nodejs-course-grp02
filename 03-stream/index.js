const http = require('http');
const fs = require('fs');

const server = http.createServer();
server.on('request', (req, res) => {
    //SOLUTION 1: READ FULL FILE
    // fs.readFile(`${__dirname}/test-file.txt`, (err, data) => {
    //     if (err){
    //         res.end("Error try reading file");
    //         return;
    //     }
    //     res.end(data);
    // });

    //SOLUTION 2: READ FILE USING STREAM
    const readable = fs.createReadStream(`${__dirname}/test-file.txt`);
    readable.on("data", (chunk) => {
        res.write(chunk);
    });

    readable.on("end", () => {
        res.end();
    });

    readable.on("error", (err) => {
        console.error(err);
        res.statusCode = 500;
        res.end("File not found");
    })


});
server.listen(8080, () => {
    console.log("server listen at 8080");
});
