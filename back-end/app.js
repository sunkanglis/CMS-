var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //解析cookie
var logger = require('morgan');

var indexRouter = require('./routes/index');
var merchantRouter = require('./routes/merchant');
var adminRouter = require('./routes/admin')

var { version } = require('./config')

// 应用程序
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//body-parser 处理form-data和request payload数据
// express 4.X 内部集成了body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //解析cookie
//处理静态资源文件   express会在静态资源目录下查找文件
app.use(express.static(path.join(__dirname, 'public')));

//启动路由工具
app.use('/', indexRouter);
app.use('/api/'+ version +'/merchant', merchantRouter);
app.use('/api/'+ version +'/admin', adminRouter);

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
