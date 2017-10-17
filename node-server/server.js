var express = require('express');
var app = express();

app.use(express.static('src',{   // 静态资源中间件
  setHeaders : function(res,path,stat){
    res.setHeader('Cache-Control', 'max-age=' + 60);
  }
}))

var server = app.listen(8081, function(){
  console.log('服务器已启动!');
})
