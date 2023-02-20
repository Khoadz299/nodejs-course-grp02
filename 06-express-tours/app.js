const express = require('express');

const app = express();

app.get('/', (req, res) => {
    // res.status(200).send('Hello from sv');

    const result = {
        message: 'Hello from sv',
        app: 'tours',
    };

    res.status(200).json(result);
});

app.listen(8080, () => {
    console.log('App running on port 8080');
});

// https://www.postman.com/