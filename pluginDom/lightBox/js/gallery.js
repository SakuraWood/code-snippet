(function($){

  var LightBox = function(){

    var self = this;

    //保存被点击元素的data-group和的 其他数据
    this.groupName = '';
    this.groupData = [];

    //创建遮罩层和弹框元素
    this.maskDom = $('<div id="lightbox-mask"></div>');
    this.popupDom = $('<div id="lightbox-popup"></div>');

    //保存body Dom
    this.bodyNode = $(document.body);

    // 渲染遮罩层及弹出框到页面 display默认为none
    this.renderDom();

    //保存 弹出框常用的DOM资源
    this.picViewArea = this.popupDom.find('.lightbox-pic-view');
    this.captionArea = this.popupDom.find('.lightbox-pic-caption');

    this.imgDom = this.popupDom.find('.lightbox-img');
    this.prevBtnDom = this.popupDom.find('.lightbox-prev-btn');
    this.nextBtnDom = this.popupDom.find('.lightbox-next-btn');

    this.picdescText = this.popupDom.find('.lightbox-pic-desc');
    this.picIndexText = this.popupDom.find('.lightbox-pic-index');
    this.closeBtn = this.popupDom.find('.light-close-btn');

    //事件委托绑定  点击触发
    this.bodyNode.on("click",".js-lightbox,[data-role='lightbox']",function(e){

      // 阻止冒泡
      e.stopPropagation();

      //获取group数据  如果点击元素是在已保存的组别，则不再重新获取
      var currentGroup = $(this).attr('data-group');
      if(self.groupName !== currentGroup){
        self.groupName = currentGroup;
        self.getGroup();
      }

      //初始化遮罩和弹框
      self.initMaskAndPopup($(this));
    });
  };

  //常用方法封装在prototy中
  LightBox.prototype = {

    //弹出遮罩和弹框
    showMaskAndPopup:function(src,id){

      this.targetIndex = this.getIndex(id);
      console.log('初始化 ：' + this.targetIndex);
      var self = this;

      //遮罩淡出
      this.maskDom.fadeIn();

      //视窗的宽高
      var winHeight = $(window).height();
      var winWidth = $(window).width();

      // console.log('视窗的宽高 ： ' + winWidth +' * '+ winHeight);

      //中间过渡状态 的样式及动画效果
      this.imgDom.hide();
      this.captionArea.hide();
      this.nextBtnDom.removeClass('lightbox-next-btn-show');
      this.prevBtnDom.removeClass('lightbox-prev-btn-show');

      this.picViewArea.css({
        'height' : (winHeight/2-10),
        'width' : (winWidth/2-10),
      });

      // console.log('picViewArea : ' + this.picViewArea.width() + ' * ' + this.picViewArea.height());

      this.popupDom.css({
        'height' : (winHeight/2),
        'width' : (winWidth/2),
        'top' : '-30%',
        'margin-left' : -winWidth/4,
        'margin-top' : -winHeight/4
      }).fadeIn().animate({
        'top' : '50%',
        'margin-top' : -winHeight/4
      },function(){
        //过渡动画完成之后 加载图片
        self.loadPicSize(src);

        //绑定关闭按钮及遮罩点击事件
        self.maskDom.click(function(e){
          e.stopPropagation();
          self.maskDom.fadeOut();
          self.popupDom.fadeOut();
        });

        self.closeBtn.click(function(e){
          e.stopPropagation();
          self.maskDom.fadeOut();
          self.popupDom.fadeOut();
        });

        //展示切换按钮
        if(!self.nextBtnDom.hasClass('disableShow')){
          self.nextBtnDom.addClass('lightbox-next-btn-show').click(function(e){
            e.stopPropagation();
            self.gotoPic('next');
          });
        }else {
          self.nextBtnDom.removeClass('lightbox-next-btn-show');
        }

        if(!self.prevBtnDom.hasClass('disableShow')){
          self.prevBtnDom.addClass('lightbox-prev-btn-show').click(function(e){
            e.stopPropagation();
            self.gotoPic('prev');
          });
        }else{
          self.prevBtnDom.removeClass('lightbox-prev-btn-show');
        }
      });

      // console.log('popupDom : ' + this.popupDom.width() + ' * ' + this.popupDom.height());

    },
    //展示图片，调整大小
    changePic:function(img,picSource){
      var self = this,
          imgHeight = img.height,
          imgWidth  = img.width;

      // console.log('加载图片的宽高 ： ' + imgWidth +' * '+ imgHeight);

      //根据窗口大小，调整弹出框大小
      var scale = Math.min($(window).height()/(imgHeight+10),$(window).width()/(imgWidth+10),1);
      // console.log(scale);
      imgHeight *= scale;
      imgWidth *= scale;

      this.captionArea.fadeOut();
      this.imgDom.fadeOut();

      // console.log('调整后图片的宽高 ： ' + imgWidth +' * '+ imgHeight);

      //调整 弹出框 及 imgView 大小
      this.popupDom.animate({
        'height' : imgHeight,
        'width' : imgWidth,
        'margin-left' : -(imgWidth)/2,
        'margin-top' : -(imgHeight)/2,
      },function(){
        self.picViewArea.animate({
          'height' : imgHeight-10,
          'width' : imgWidth-10,
        },function(){
          //展示图片
          self.imgDom.attr({
            'src' : picSource,
          }).fadeIn(400,function(){
            //初始化切换按钮和数据
              //判断图片切换按钮是否展示

              if(self.groupData.length === 1){
                self.prevBtnDom.addClass("disableShow");
                self.nextBtnDom.addClass("disableShow");
              }else {
                if(self.targetIndex === 0){
                  self.prevBtnDom.addClass("disableShow");
                  self.nextBtnDom.removeClass("disableShow");
                }else if (self.targetIndex === (self.groupData.length-1)) {
                  self.prevBtnDom.removeClass("disableShow");
                  self.nextBtnDom.addClass("disableShow");
                }else {
                  self.prevBtnDom.removeClass("disableShow");
                  self.nextBtnDom.removeClass("disableShow");
                }
              }

              //展示区域数据

              self.picdescText.text(self.groupData[self.targetIndex].caption);
              self.picIndexText.text('当前索引 ：' + (self.targetIndex+1) + ' of ' + self.groupData.length);

              self.captionArea.fadeIn();
          });
        });
      });
    },
    //加载图片
    loadPicSize : function(picSource){

      var self = this;
      //图片加载完成后执行
      this.preLoadImg(picSource);

    },
    //切换图片
    gotoPic : function(str){
      if(str === 'next'){
        this.targetIndex+=1;
        console.log('next :' + this.targetIndex);
        var nextPicSrc = this.groupData[this.targetIndex].src;
        this.loadPicSize(nextPicSrc);
      }
      if(str === 'prev'){
        this.targetIndex-=1;
        console.log('prev :' + this.targetIndex);
        var prevPicSrc = this.groupData[this.targetIndex].src;
        this.loadPicSize(prevPicSrc);
      }
    },
    //图片完成加载后执行
    preLoadImg : function(picSource){

      var self = this,
          img = new Image();
      img.src = picSource;

      img.onload = function(){
        self.changePic(img,picSource);
      };
    },
    //获取索引
    getIndex:function(dataId){
      return this.bodyNode.find("*[data-group = "+ this.groupName +"]").index($("*[data-id = " + dataId + "]"));
    },
    //初始化遮罩和弹框
    initMaskAndPopup : function(targetObj){

      var self = this,
          sourceSrc = targetObj.attr('data-source'),
          sourceId = targetObj.attr('data-id');

      this.showMaskAndPopup(sourceSrc,sourceId);
    },
    //获取同组元素，及元素对应的数据
    getGroup : function(){

      var self = this;
      //获取 被点击元素的同data-group的所有元素
      var grouplist = this.bodyNode.find($("*[data-group="+ this.groupName +"]"));

      //清空数据，防止之前数据的干扰
      self.groupData = [];
      //遍历元素
      grouplist.each(function(index,element){
        self.groupData.push({
           src : $(this).attr('data-source'),
           id : $(this).attr('data-id'),
           caption : $(this).attr('data-caption')
        });
      });
    },
    //渲染遮罩和弹框
    renderDom : function(){
      //弹框内部元素保存为字符串
      var strDom = '<div class="lightbox-pic-view">'+
                '<span class="lightbox-btn lightbox-prev-btn"></span>'+
                '<img  src="" class="lightbox-img">'+
                '<span class="lightbox-btn lightbox-next-btn"></span>'+
              '</div>'+
              '<div class="lightbox-pic-caption">'+
                '<div class="lightbox-caption-area">'+
                  '<p class="lightbox-pic-desc"></p>'+
                  '<span class="lightbox-pic-index"></span>'+
                '</div>'+
                '<span class="light-close-btn"></span>'+
              '</div>';
      this.popupDom.html(strDom);
      this.bodyNode.append(this.maskDom,this.popupDom);
    },
  };

  //注册到window？？
  window["LightBox"] = LightBox;
})(jQuery);
