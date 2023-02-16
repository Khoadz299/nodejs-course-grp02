const http = require('http');
const fs = require('fs');
const url = require('url');
const templateHandler = require('./templateHandler/templateHandler')

//Method 2: read the data once when starting app
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const jsonData = JSON.parse(data);

const templateOverviews = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');



const server = http.createServer((req, res) => {
    console.log(req.url);
    // const pathName = req.url;
    // console.log(url.parse(req.url, true))

    // const obj =  url.parse(req.url, true);
    // let pathname = obj.pathname;
    // let query = obj.query;
    const {query, pathname} = url.parse(req.url, true);

    if (pathname === '/overview'){

        //method 1
        const cards = jsonData.map(d => templateHandler.replaceTemplate(templateCard, d));

        //method 2
        // let cards = [];
        // for (let i = 0; i < jsonData.length ; i++){
        //     const product = jsonData[i];
        //     cards.push(replaceTemplates(templateCard, product));
        // }
        let output = templateOverviews.replace(/{%PRODUCT_CARD%/g, cards.join(''));

        res.writeHead(200, {
            'Content-type': 'text/html', // Content is HTML
        })
        res.end(output)
    }
    else if (pathname === '/product'){
        const product = jsonData[query.id*1];
        const output = templateHandler.replaceTemplate(templateProduct,product);

        res.writeHead(200, {
            'Content-type': 'text/html', // Content is HTML
        })
        res.end(output);
    }
    else if (pathname === '/api'){

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