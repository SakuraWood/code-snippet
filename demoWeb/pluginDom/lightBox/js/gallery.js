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

    // this.renderDom();

    //事件委托绑定

    this.bodyNode.on("click",".js-lightbox,[data-role='lightbox']",function(e){
      // 阻止冒泡
      e.stopPropagation();
      var currentGroup = $(this).attr('data-group');
      if(self.groupName !== currentGroup){
        self.groupName = currentGroup;
        self.getGroup();
      }
    });

  };
  //写方法
  LightBox.prototype = {

    //渲染遮罩和弹框
    renderDom : function(){
      //弹框内部元素保存为字符串
      var strDom = '<div class="lightbox-pic-view">'+
                '<span class="lightbox-btn lightbox-prev-btn"></span>'+
                '<img  src="src/img/group-1.1-thumb.jpg" class="lightbox-img" alt="">'+
                '<span class="lightbox-btn lightbox-next-btn"></span>'+
              '</div>'+
              '<div class="lightbox-pic-caption">'+
                '<div class="lightbox-caption-area">'+
                  '<p class="lightbox-pic-desc">图片标题</p>'+
                  '<span class="lightbox-pic-index">当前索引 ： 1 of 4</span>'+
                '</div>'+
                '<span class="light-close-btn"></span>'+
              '</div>';
      this.popupDom.html(strDom);
      this.bodyNode.append(this.maskDom,this.popupDom);
    },
    getGroup : function(){


      var grouplist = this.bodyNode.find($('*[data-group="+ this.groupName +"]'));
      console.log(grouplist);
    }
  };

  //注册到window？？
  window["LightBox"] = LightBox;

})(jQuery);
