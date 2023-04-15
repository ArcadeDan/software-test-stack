const http = require('http');
const port = 3000;
const express = require('express');
const app = express();
const { spawn } = require('child_process');



app.get('/', (req, res) => {
    res.send('Hello, World!');
    });

const pythonScript = spawn('python3', ['test.py', '2', '3']);
app.listen(port, () => console.log(`Test app listening on port ${port}`));



pythonScript.stdout.on('data', (data) => {
    console.log('stdout: ${data}');
    const result = parseInt(data);
    if (result == 5) {
        console.log('Test passed');
    } else {
        console.log('Test failed');
    }

});

pythonScript.stderr.on('data', (data) => {
    console.log('stderr: ${data}');
});

pythonScript.on('close', (code) => {
    console.log('child process exited with code ${code}');
});









