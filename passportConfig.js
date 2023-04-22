const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connected to the test database.');
    }
}
);


function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {

        db.get('SELECT * FROM test WHERE email = ?', email, async (err, row) => {
            if (err)  { return done(err); }
            if (!row) { return done(null, false, {message: 'No user with that email'}) }

        try {
            if (await bcrypt.compare(password, row.password)) {
                return done(null, row)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (e) {
            return done(e)
        }
        
    });
    };
    
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        db.get('SELECT * FROM test WHERE id = ?', id, (err, row) => {
        if (err) { return done(err) }
        if (!row) { return done(null, false, {message: 'No user with that id'}) }
        console.log('Successful deserialize');
        return done(null, row)

    })
}
);
}

module.exports = initialize