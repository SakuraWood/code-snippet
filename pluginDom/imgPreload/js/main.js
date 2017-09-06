var imgs = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497178499045&di=7700d7e15f02526269393fcb196a39b5&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F95eef01f3a292df5dfadcc35bf315c6034a873a7.jpg",
           "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497178499044&di=4ef98f96d1baadd7c6de9ef372603e57&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F024f78f0f736afc33199a401b119ebc4b7451238.jpg",
           "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497178499036&di=7dafa073f46a6258ba8c396a445a134d&imgtype=0&src=http%3A%2F%2Fwww.danji8.com%2Fuploadpic%2F201212%2F06%2F2012120611001143231354762811.jpg",
           "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497178499035&di=f16b0550a0ad72bf895ecfb01a51942a&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F91529822720e0cf33f2c2edb0946f21fbe09aa33.jpg",
           "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497178653631&di=6b6d8c6667330373db6706fd2e32b808&imgtype=0&src=http%3A%2F%2Fatt.bbs.duowan.com%2Fforum%2F201404%2F26%2F133641zl9bebnbuz4z99t4.jpg",
           "http://pic1.win4000.com/wallpaper/b/52733d7e45676.jpg",
           "http://pic1.win4000.com/wallpaper/b/52733d830cc39.jpg",
           "http://pic1.win4000.com/wallpaper/b/52733d86ee189.jpg",
           "http://pic1.win4000.com/wallpaper/b/52733d8e91d0c.jpg",
           "http://pic1.win4000.com/wallpaper/b/52733d927fc00.jpg"
         ],
   index = 0,
   srcLenght = imgs.length;

$.preload(imgs,{

    order : "order",
    each : function(progressNum,srcLenghtNum){
      $("div.imgbox-container").find('div.loading-progress').find('p').html(Math.floor(progressNum/srcLenghtNum * 100) + "%");
    },
    all : function(){
      $("div.loading-progress").hide();
    }
});


$("button.change-img-button").on('click',function(event) {
  event.preventDefault();
  /* Act on the event */

  if( "prev" === $(this).attr('data-control')){
    index = (++index)%srcLenght;
    $(this).parent().parent("div.imgbox-container").children("img").attr('src', imgs[index]);
  }else if("next" === $(this).attr('data-control')){
    indextemp = (--index)%srcLenght;
    index = indextemp < 0 ? indextemp + srcLenght : indextemp;
    $(this).parent().parent("div.imgbox-container").children("img").attr('src', imgs[index]);
  }
});
