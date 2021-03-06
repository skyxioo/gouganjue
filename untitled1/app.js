var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = require('./db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name:'skey',
    secret:'ddddd',// 用来对session id相关的cookie进行签名
    resave: false, // 是否每次都重新保存会话，建议false
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    store:new MongoStore({
        mongooseConnection:db.dbCon
    })
}));

app.use(function(req, res, next){
    var url = req.originalUrl;
    if (url != "/login" && url != "/reg" && url != "/" && !req.session.user) {
        return res.redirect("/login");
    }

    var err = req.session.error;
    var success = req.session.success;
    var user = req.session.user;
    var mess = req.session.message;
    delete req.session.success;
    delete req.session.error;
    delete req.session.message;
    if(err){
        res.locals.message = "*"+err;
    }
    if(mess){
        res.locals.message = "*" + mess;
    }
    if(success){
        res.locals.success = success;
    }
    if(user){
        res.locals.user = user.name;
    }
    next();
});

app.use('/', index);
app.use('/users', users);


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
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
