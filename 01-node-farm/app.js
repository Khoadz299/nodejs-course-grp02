const http = require('http');
const fs = require('fs');


//Method 2: read the data once when starting app
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const jsonData = JSON.parse(data);

const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if (pathName === '/overview'){
        res.end('This is OVERVIEW');
    }else if (pathName === '/product'){
        res.end('This is PRODUCT');
    }else if (pathName === '/api'){

        //Method 1: read the data every time request come in
        // fs.readFile('./dev-data/data.json', 'utf-8', (err, data) => {
        //     console.log(typeof data);
        //
        //     const jsonData = JSON.parse(data);
        //     console.log(typeof jsonData);
        //     console.log(jsonData);
        //
        //     res.writeHead(200, {
        //         'Content-type': 'application/json',
        //     })
        //     res.end(data);
        // })
        ////////


        //Method 2: read the data once when starting app
        res.writeHead(200, {
            'Content-type': 'application/json', //content is json
        })
        res.end(data);
    }
    else{
        //set response with status code = 404 -> NOT DOUNF
        //set response with status code and header
        res.writeHead(404, {
            'Content-type': 'text/html', //response content is HTML
            'my-header': '123',
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8080, () => {
    console.log('Listening on 8080 ....')
});