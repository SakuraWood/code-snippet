$(function(){
  MyYingying.InitPage();
});

var MyYingying = function(){

var index = 0,
    itemIndex = 0,
    itemMax = 0,
    boxMaskDom = $(".imgbox-mask"),
    boxWrapDom = $(".imgbox-wrapper"),
    leftBtn = $(".switch-btn-area-left"),
    rightBtn = $(".switch-btn-area-right"),
    imgDom = boxWrapDom.find("img"),
    h2Dom = boxWrapDom.find("h2"),
    pDom = boxWrapDom.find("p");

//title中circle文案
  timecircleContent_enter = "07.31";
  timecircleContent_leave = "2016";

//circle 动画事件
  $(".timecircle").on("mouseenter",function(){
    $(this).find("h3").fadeOut(400,function(){
      $(this).text(timecircleContent_enter).fadeIn(400);
    });
  }).on("mouseleave",function(){
    $(this).find("h3").fadeOut(400,function(){
      $(this).text(timecircleContent_leave).fadeIn(400);
    });
  });

//滚动时 动态展示item
  function containerScroll(){
    var ScrollH = 0;
    var itemH = 142;

    $(".body-container").on("scroll",function(){
      ScrollH = $(this).scrollTop();
      $(".item-out").map(function(index,el){
        var after = ($(this)[0].offsetTop-ScrollH) < 870;
        var after2 = $(this)[0].offsetTop-ScrollH > 150 ;
        if(after&&after2){
          $(this).removeClass("item-out");
        }
      });

      $(".item").map(function(index,el){
        var before = $(this)[0].offsetTop-ScrollH < 150 ;
        var before2 = ($(this)[0].offsetTop-ScrollH) > 870;
        if(before||before2){
          $(this).addClass("item-out");
        }
      });
    });
  }


//心形动画
$(".heart-wrapper").fadeIn().click(function(){

    $(this).fadeOut(function(){
      startShow();
    });
});

//item事件委托到body
$("body").on("click",".item .content a",function(e){
  e.preventDefault();
  index = $(this).attr("data-index");
  //每次点击置 0
  itemIndex = 0;
  itemMax = data[index].url.length;
  console.log("index : " + index);
  console.log("itemIndex : " + itemIndex);
  console.log("itemMax : " + itemMax);

  imgSrcChange();
  checkBtn();
  boxMaskDom.fadeIn(function(){
    boxWrapDom.fadeIn();
  });
});

leftBtn.on("click",function(){
  imgDom.fadeOut(function(){
    itemIndex-=1;
    imgSrcChange();
    checkBtn();
    imgDom.fadeIn();
  });
});

rightBtn.on("click",function(){
  imgDom.fadeOut(function(){
    itemIndex+=1;
    imgSrcChange();
    checkBtn();
    imgDom.fadeIn();
  });
});

boxMaskDom.click(function(e){
  e.preventDefault();

  boxWrapDom.fadeOut(function(){
    boxMaskDom.fadeOut();
  });
});

//改变图片及文字资源
function imgSrcChange(){
  imgDom.attr("src",data[index].url[itemIndex]);
  h2Dom.text(data[index].title);
  pDom.text(data[index].content[itemIndex]);
}

//检查按钮显示状态
function checkBtn(){
  console.log("checkbtn itemIndex : " + itemIndex);
  if(itemIndex == 0){
    leftBtn.css("display", "none");
    console.log("leftBtn none");
  }else {
    leftBtn.css("display", "flex");
    console.log("leftBtn flex");
  }

  if(itemIndex == itemMax-1){
    rightBtn.css("display", "none");
    console.log("rightBtn none");
  }else {
    rightBtn.css("display", "flex");
    console.log("rightBtn flex");
  }
}

//页面加载完成后开场动画
  function startShow(){

      $(".begin").fadeIn(2000,function(){
        $(".timecircle").addClass("timecircle-hover").mouseenter();
        $(".begin-content").removeClass("begin-content-out");

        setTimeout(function(){
          $(".timecircle").removeClass("timecircle-hover").mouseleave();
          $(".body-container").fadeIn(1000,function(){
          itemShow();
          });
        },1500);
     });
  }

  function itemShow(){
    $(".item").eq(0).animate({},function(){
      $(this).removeClass("item-out").animate({"height": "80px"},800,function(){
        $(this).next().removeClass("item-out").animate({"height": "80px"},800,function(){
          $(this).next().removeClass("item-out").animate({"height": "80px"},800,function(){
            $(this).next().removeClass("item-out").animate({"height": "80px"},800,function(){
              $(this).next().removeClass("item-out");
              containerScroll();
            });
          });
        });
      });
    });
  }

  return {
    InitPage : function(){
      // startShow();
    }
  };
}();
