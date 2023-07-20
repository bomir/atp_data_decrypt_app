//node --version
//npm --version
//sudo npm install -g express-generator
// npm view express version
//.... create app scheleton .....
//express atp_data_decrypt_app --view pug
//cd helloworld
//npm atp_data_decrypt_app

//.... RUN ...
// #Run atp_data_decrypt_app on Windows with Command Prompt
//SET DEBUG=atp_data_decrypt_app:* & npm start

// #Run atp_data_decrypt_app on Windows with PowerShell
//SET DEBUG=atp_data_decrypt_app:* | npm start

//# Run atp_data_decrypt_app on Linux/macOS
//DEBUG=atp_data_decrypt_app:* npm start

//... access ....
//http://localhost:3000/decrypt



var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var decryptRouter = require('./routes/decrypt');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//to avoid entity too large error
const myParser = require("body-parser");
app.use(myParser.json({limit: '200mb'}));
app.use(myParser.urlencoded({limit: '200mb', extended: true}));
app.use(myParser.text({ limit: '200mb' }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/decrypt', decryptRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
