// �ȴ�ҳ��Ԫ�ؼ��������ִ�нű�
$(function(){
  // �����ֲ�ͼ����
  $("#mycarousel").carousel({
    interval : 2000,
    wrap : true,
  });

  // ʹ content-text-p ���ı�����

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
