;(function($) {

  var carousel = function(poster) {
    //将poster 存到对象下 方便使用
    this.poster = poster;
    this.posterList =  this.poster.find("ul.main-list");
    this.posterListItems =  this.posterList.find("li.list-item");
    this.posterFirstItem = this.posterListItems.eq(0);
    this.posterLastItem = this.posterListItems.last();
    this.leftBtn = this.poster.find("div.carousel-prev-btn");
    this.rightBtn = this.poster.find("div.carousel-next-btn");
    this.flag = true;

    //设置默认参数
    var defaultSetting = {
      "width": 900,
      "height": 270,
      "posterWidth": 640,
      "posterHeight": 270,
      "scale": 0.9,
      "speed": 300,
      "verticalAlign":"top",
      "autoPlay" : false,
      "autoTime" : 2000
    };

    //旋转木马参数
    this.setting = $.extend(true, {}, defaultSetting, this.getSettingJson());

    //初始化样式
    this.setPoster();
    this.setPosterPos();

    //绑定旋转事件

    var _self_ = this;
    this.leftBtn.click(function(){
      console.log('click leftBtn');
      if(_self_.flag){
        _self_.flag = false;
        _self_.revolve('left');
      }
    });

    this.rightBtn.click(function(){
      console.log('click rightBtn');
      if(_self_.flag){
        _self_.flag = false;
        _self_.revolve('right');
      }
    });

    //自动播放

    if(this.setting.autoPlay === true){

      this.autoPlay();
      this.poster.hover(function(){
        window.clearInterval(_self_.temp);
      },function(){
        _self_.autoPlay();
      });
    }
  };

  carousel.prototype = {

    //自动播放
    autoPlay : function(){

      var _self = this;
      this.temp = window.setInterval(function(){
        _self.revolve('right');
      },_self.setting.autoTime);

    },
    //旋转
    revolve : function(str){
      var _self = this;

      if(str === 'left'){
          this.posterListItems.each(function(index,el){
            var self = $(this),
                prev = self.prev().get(0)?self.prev():_self.posterLastItem,
                width =  prev.width(),
                height = prev.height(),
                opacity = prev.css('opacity'),
                top = prev.css('top'),
                left = prev.css('left'),
                zindex = prev.css('z-index');

                self.animate({
                  'width' : width,
                  'height' : height,
                  'left' : left,
                  'top' : top,
                  'opacity' : opacity,
                  'z-index' : zindex,
                },_self.setting.speed,function(){
                  _self.flag = true;
                });
          });

      }else if(str === 'right'){

        this.posterListItems.each(function(index,el){
          var self = $(this),
              next = self.next().get(0)?self.next():_self.posterFirstItem,
              width =  next.width(),
              height = next.height(),
              opacity = next.css('opacity'),
              top = next.css('top'),
              left = next.css('left'),
              zindex = next.css('z-index');

              self.animate({
                'width' : width,
                'height' : height,
                'left' : left,
                'top' : top,
                'opacity' : opacity,
                'z-index' : zindex,
              },_self.setting.speed,function(){
                _self.flag = true;
              });
        });
      }
    },
    //根据参数，设置top值
    setTop : function(height){

      var topVerticalAlign = this.setting.verticalAlign;

      switch (topVerticalAlign) {
        case 'top':
          return 0;
        case 'middle':
          return (this.setting.height-height)/2;
        case 'bottom':
          return this.setting.height-height;
        default:
          return 0;
      }

    },
    //设置剩余帧的样式
    setPosterPos : function(){
    var self = this,
        MainWidth = this.setting.width,
        MainHeight = this.setting.height,
        FirstItemWidth = this.setting.posterWidth,
        FirstItemHeight = this.setting.posterHeight,
        sliceItems = this.posterListItems.slice(1),
        tempNum = (this.posterListItems.length-1)/2,
        rightItems = sliceItems.slice(0,tempNum),
        leftItems =  sliceItems.slice(tempNum),
        gapAll = (MainWidth-FirstItemWidth)/2,
        gap = gapAll/tempNum,
        i = 0,
        j = 0,
        w = FirstItemWidth,
        h = FirstItemHeight,
        z = tempNum;

    rightItems.each(function(index,el){

       w*=self.setting.scale;
       h*=self.setting.scale;
       i+=2;
       j++;
       $(this).css({
         'width' : w,
         'height' : h,
         'left' : gapAll+FirstItemWidth+gap*j-w,
         'top' : self.setTop(h),
         'opacity' : 1/(i),
         'z-index' : --z,
       });
    });

    leftItems.each(function(index,el){

       $(this).css({
         'width' : w,
         'height' : h,
         'left' : gap*(tempNum-j),
         'top' : self.setTop(h),
         'opacity' : 1/i,
         'z-index' : z++,
       });

       w/=self.setting.scale;
       h/=self.setting.scale;
       i-=2;
       j--;
    });

    },
    //初始化 poster/按钮/第一帧
    setPoster:function(){
      var self = this,
      Firstleft = (this.setting.width-this.setting.posterWidth)/2;

      this.poster.css({
        'width' : this.setting.width,
        'height' : this.setting.height,
      });

      this.posterList.css({
        'width' : this.setting.width,
        'height' : this.setting.height,
      });

      this.leftBtn.css({
        'width' : Firstleft,
        'height' : this.setting.height,
        'z-index' : Math.ceil((this.posterListItems.length)/2)
      });

      this.rightBtn.css({
        'width' : Firstleft,
        'height' : this.setting.height,
        'z-index' : Math.ceil((this.posterListItems.length)/2)
      });

      this.posterFirstItem.css({
        'width' : this.setting.posterWidth,
        'height' : this.setting.posterHeight,
        'left' : Firstleft,
        'top' : 0,
        'z-index' : Math.floor((this.posterListItems.length-1)/2),
      });
    },

    //获取DOM中的参数
    getSettingJson: function() {

      var temp = this.poster.attr('data-setting');
      if (temp) {
        return JSON.parse(this.poster.attr('data-setting'));
      } else {
        return {};
      }
    }
  };

  carousel.init = function(posters) {
    //此处的this指向 carousel对象
    var _this_ = this;
    posters.each(function(index, el) {
      //此处的this指向 main-poster节点
      new _this_($(this));
    });
  };
  window.carousel = carousel;

})(jQuery);
