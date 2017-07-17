//定义一个测试使用模块
define(function(){
    var a = "test模块中定义的变量";
    var add = function(x,y){
      return x*y;
    };

    return {
      add :add,
      a : a
    };
});
