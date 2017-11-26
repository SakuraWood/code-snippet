formidable = require('formidable') //载入formidable
var express = require('express');
var app = express();

app.use(express.static('src',{   // 静态资源中间件
  setHeaders : function(res,path,stat){
    res.setHeader('Cache-Control', 'max-age=' + 6000);
  }
}))

app.post('/upload',function(req,res){
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = './src/images';
  form.keepExtensions = true;

  res.send({
    'msg':'upload file'
  });
})

var server = app.listen(8081, function(){
  console.log('服务器已启动!');
})
