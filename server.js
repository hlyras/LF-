var express = require('express');
var session  = require('express-session');
var path = require('path');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

require('./config/socketio')(io);

var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');


var passport = require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'app/view'));
app.set('view engine', 'ejs');

app.use(favicon());
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var routes = require('./routes/index');

app.use('/', routes);

app.use(function(req, res, next) {
  res.render('error');
});

server.listen(3000, () => {
	console.log('server listening on port 3000');
});