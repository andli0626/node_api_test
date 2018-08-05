/**
 * 签到后台服务
 * 基于 Express，jade，mongodb（mongoose）
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // HTTP请求体解析中间件

var fs = require("fs");
var https = require("https");

// 设置 https
const httpsOption = {
  key : fs.readFileSync("./ssl/1524033976780.key"),
  cert: fs.readFileSync("./ssl/1524033976780.pem")
}



var app = express();

// 数据库初始化（连接）
// var mongoose = require('./config/mongoose.js');
// var db = mongoose();

app.set('views', path.join(__dirname, 'views')); // 视图页面
app.set('view engine', 'jade'); // 模板引擎jade

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev')); // 开发者模式：控制台输出日志信息

app.use(bodyParser.json()); // HTTP请求体解析中间件
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser()); // 使用cookie

app.use(express.static(path.join(__dirname, 'public'))); // 静态资源渲染

require('./routes/index')(app); // 页面路由

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

http.createServer(app).listen(80);
https.createServer(httpsOption, app).listen(443);
console.log("启动服务:8089")