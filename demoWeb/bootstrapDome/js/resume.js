// 等待页面元素加载完成再执行脚本
$(function(){
  // 设置轮播图参数
  $("#mycarousel").carousel({
    interval : 2000,
    wrap : true,
  });

  // 使 content-text-p 中文本居中

   $(".content-text").eq(0).css('margin-top', ($(".content_2").height()-$(".content-text").eq(0).height())/2);
   $('.content_2').resize(function(event) {
     /* Act on the event */
     $(".content-text").eq(0).css('margin-top', ($(".content_2").height()-$(".content-text").eq(0).height())/2);
   });

   $(".content-text").eq(1).css('margin-top', ($(".content_3").height()-$(".content-text").eq(0).height())/2);
   $('.content_3').resize(function(event) {
     /* Act on the event */
     $(".content-text").eq(1).css('margin-top', ($(".content_3").height()-$(".content-text").eq(0).height())/2);
   });
});
