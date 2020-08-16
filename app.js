var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var dashBoardRouter = require('./routes/dashboard');
var worldRouter = require('./routes/world');
var indiaRouter = require('./routes/india');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))



app.use('/', indexRouter);
app.use('/', dashBoardRouter);
app.use('/', worldRouter);
app.use('/', indiaRouter);


//Start 
app.listen(3000,(err,result)=>{
  if(err) throw err;
  else 
  console.log("App is Running on Port 3000")
})

module.exports = app;
