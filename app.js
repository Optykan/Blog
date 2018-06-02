var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var User = require('./models/User')

var index = require('./routes/index')
var blog = require('./routes/blog');
var users = require('./routes/users');
var login = require('./routes/login');
var posts = require('./routes/posts');
var api = require('./routes/api');

var app = express();

process.on('uncaughtException', function (exception) {
	console.log(exception);
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

var mongoOptions={
	url: process.env.MONGO_DB_URL
}
app.use(session({
	store: new MongoStore(mongoOptions),
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());

// auth stuff
passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: process.env.PASSPORT_GOOGLE_CALLBACK
},
function(token, tokenSecret, profile, done) {
	User.create({ googleId: profile.id }, function (err, user) {
		return done(err, user);
	});
	User.findOrCreate(profile).then(user=>{
		return done(null, user)
	});
}))

passport.serializeUser(function(user, done) {
	console.log(user)
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

app.use('/', index);
app.use('/blog', blog);
app.use('/users', users);
app.use('/auth', login);
app.use('/posts', posts);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mongoOptions={
	url: process.env.MONGO_DB_URL
}
app.use(session({
	store: new MongoStore(mongoOptions),
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))


// auth stuff
passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: process.env.PASSPORT_GOOGLE_CALLBACK
},
function(token, tokenSecret, profile, done) {
	User.create({ googleId: profile.id }, function (err, user) {
		return done(err, user);
	});
	User.findOrCreate(profile).then(user=>{
		return done(null, profile)
	});
}))

module.exports = app;
