const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const db = require('./connection');

passport.serializeUser(async (user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let query = "SELECT * FROM users WHERE id = '"+id+"';";
    let user = await db(query);
    done(null, user[0]);
});

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, username, password, done) => {
        let query = "SELECT * FROM users WHERE username='"+username+"' OR email='"+req.body.email+"';";
        let users = await db(query);
        
        if (users.length) {
            return done(null, false, req.flash('signupMessage', 'Este usuário já existe.'));
        } else {
            let newUserMysql = {
                name: req.body.name,
                email: req.body.email,
                username: username,
                password: bcrypt.hashSync(password, null, null),
                age: req.body.age
            };
            
            let insertQuery = "INSERT INTO users ( name, email, username, password, age ) values ('"+newUserMysql.name+"', '"+newUserMysql.email+"', '"+newUserMysql.username+"', '"+newUserMysql.password+"', '"+newUserMysql.age+"')";
            let result = await db(insertQuery);
            newUserMysql.id = result.insertId;
            
            return done(null, newUserMysql);
        };
    })
);

passport.use(
    'local-login',
    new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, username, password, done) => {
        let query = "SELECT * FROM users WHERE username = '"+username+"';";
        let users = await db(query);
        
        if (!users.length){
            return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.'))
        };
        
        if (!bcrypt.compareSync(password, users[0].password)){
            return done(null, false, req.flash('loginMessage', 'Senha inválida.'));
        };
        
        return done(null, users[0]);
    })
);

module.exports = passport;