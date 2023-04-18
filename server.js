const http = require('http');
const port = 3000;
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();
const { spawn } = require('child_process');



app.get('/', (req, res) => {
    res.send('Hello, World!');
    });

function checkAuthenticated(req, res, next) {
    if (req.headers['x-auth'] == '12345') {
        next();
    } 
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    } 
    next();
}

const createPassport = require('./passportConfig');
createPassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/' , checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name});
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/txt', express.static(__dirname + 'public/js'));



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









