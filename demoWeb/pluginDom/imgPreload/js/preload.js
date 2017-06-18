;(function($){

  var Preload = function(imgs , opts){

    //默认配置
    var defaultOpts = {
      order : "unorder",
      each : null,
      all : null
    };
    //处理imgs参数
    this.imgs = (typeof imgs === 'string')?[imgs]:imgs;
    //处理opts
    this.opts = $.extend(true, {} , defaultOpts, opts);

    if("order" === this.opts.order){
      this._orderloading();
    }else{
      this._unorderloading();
    }
  };

  Preload.prototype = {
    _unorderloading : function(){
      var imgs = this.imgs,
          opts = this.opts,
          progress = 1,
          srcLenght = imgs.length;

      $.each(imgs,function(index, el) {
          var imgObj = new Image();
          imgObj.src = el;
          $(imgObj).on('load error',function(event) {
            event.preventDefault();
            /* Act on the event */
            progress++;
            opts.each(progress,srcLenght);
            if (progress >= srcLenght) {
              opts.all();
              progress = 1;
              return;
            }
          });
      });
    },

    _orderloading : function(){

      var imgs = this.imgs,
          opts = this.opts,
          progress = 0,
          srcLenght = imgs.length;

          load();
          function load(){

            if(progress === srcLenght){
              progress = 0;
              opts.all();
              return ;
            }
            
            var imgObj = new Image();
            imgObj.src = imgs[progress];

            $(imgObj).on('load error', function(event) {
              event.preventDefault();
              /* Act on the event */
              progress++;
              opts.each(progress,srcLenght);
              load();
            });
          }
    },
  };

  $.extend({
    preload : function(imgs , opts){
      new Preload(imgs,opts);
    }
  });


})(jQuery);
