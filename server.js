const http = require('http');
const port = 3000;
const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello, World!');
    });



app.listen(port, () => console.log(`Test app listening on port ${port}`));