require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var fs = require('fs');
var index = require('./routes/index')
var blog = require('./routes/blog');
var api = require('./routes/api');
var admin = require('./routes/admin');

var app = express();

process.on('uncaughtException', function (exception) {
	console.log(exception);
});

const firebaseAdmin = require("firebase-admin")
var serviceAccount = require("./firebase-creds.json");

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_URL
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ejs helper functions
app.locals.random = function(low, high){
	// hopefully this works
	return Math.floor(Math.random() * (high-low)) + low;
};

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/', index);
app.use('/blog', blog);
app.use('/api', api);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('The page you were looking for couldn\'t be found.');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;
  res.locals.stacktrace = req.app.get('env') === 'development' ? err.stack : 'No stacktrace available.'; 

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: "Error | Samuel Yang"});
});


module.exports = app;
