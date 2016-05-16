import express from 'express';
import session from 'express-session';
import expressMsg from 'express-messages';
import expressValidator from 'express-validator';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer';
import passport from 'passport';
import flash from 'connect-flash';

import livereload from 'connect-livereload';

import routes from './routes/index';
import users from './routes/users';
import schools from './routes/schools';

const app = express();
const upload = multer();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Handle static content like HTML/CSS
app.use(express.static(path.join(__dirname, 'public')));

// Init morgan to log in 'dev' mode
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle Express sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


// Configure Passport
app.use(passport.initialize());
app.use(passport.session());

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(cookieParser());

// Configure message flashing
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = expressMsg(req, res);
  next();
});

// Handle logged in user
app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

app.use(livereload({
  port: 35729
}));

app.use('/', routes);
app.use('/users', users);
app.use('/schools', schools);

 
app.listen(3000, () => {
  console.log('Server listening 3000 port');
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
