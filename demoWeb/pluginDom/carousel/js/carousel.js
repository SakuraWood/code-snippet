;(function($){

  var carousel = function(poster){
    //将poster 存到对象下 方便使用
    this.poster = poster;

    //设置默认参数
    var defaultSetting = {
      "width":1000,
      "height":270,
      "posterWidth":640,
      "posterHeight":270,
      "scale":0.8,
      "speed":300
    };

    //旋转木马参数
    this.setting = $.extend(true,{},defaultSetting,this.getSettingJson());
  };

  carousel.prototype = {
    getSettingJson : function(){

    var temp = this.poster.attr('data-setting');
    if(temp){
      return JSON.parse(this.poster.attr('data-setting'));
    }else{
      return {};
    }
    }
  };

  carousel.init = function(posters){
    //此处的this指向 carousel对象
    var _this_ = this;
    posters.each(function(index, el) {
      //此处的this指向 main-poster节点
      new _this_($(this));
    });
  };
  window.carousel= carousel;

})(jQuery);
