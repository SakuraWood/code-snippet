(function($){

  var LightBox = function(){
    console.log(1);
  };

  //写方法
  LightBox.prototype = {

  };

  //注册到window？？
  window["LightBox"] = LightBox;

})(jQuery);
