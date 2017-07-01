var express = require('express');
var app = express();

//允许跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});


app.post('/testpost', function (req, res) {
   res.send({
     "type" : "post",
	   "user" : "leichangchun",
	   "password" : "123456789"
   });
});

app.get('/testget', function (req, res) {
   res.send({
     "type" : "get",
	   "user" : "leichangchun",
	   "password" : "123456789"
   });
});


//监听的接口 localhost:8081
var server = app.listen(8081, function () {
  console.log("服务器已启动！");
});
