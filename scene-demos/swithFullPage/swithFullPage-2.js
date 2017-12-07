window.onload = function(){
  var index = 0,
      windowHeight = document.body.clientHeight,
      article = document.querySelector('.container'),
      sections = document.querySelector('.container').querySelectorAll('section'),
      pageIndexs = document.querySelector('.pageIndex').querySelectorAll('li'),
      sectionsCount = sections.length,
      flag = true,
      parse = 200;
      dir = 'top';

  //监听事件
    //滚轮事件
	if(document.addEventListener){  //只有firefox使用 DOMMouseScroll
		document.addEventListener('DOMMouseScroll',scrollPage);
	}
	document.onmousewheel = scrollPage;  //其他浏览器  万恶的兼容性

  addEvent(document,'keydown',function(e){ //另一种绑定方式

    e = e || window.event;
    if(e.keyCode === 37 || e.keyCode === 38){
      changeSection(-1);
    }else if(e.keyCode === 39 || e.keyCode === 40){
      changeSection(1);
    }
  })

    //点击事件  使用事件委托，减少绑定事件的数量

  addEvent(document.querySelector('.pageIndex'),'click',function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    var targetIndex = [].slice.call(pageIndexs).indexOf(target);
    console.log('targetIndex : ' + targetIndex);
    if(targetIndex > 0 || targetIndex !== index){
      changeSection(targetIndex - index)
    }
  })

  function scrollPage(e){  //滚动处理函数
  	e = e || window.event;
    var scrollDistance = e.detail || e.wheelDelta;

    if(scrollDistance > 0){//wheel up
      changeSection(-1);
    }else {//wheel down
      changeSection(1);
    }
  }

  function changeSection(num){ //切换页面和索引原点

    if(flag){

      nextIndex = num < 0 && (index + num >= 0) ? index + num : num > 0 && (index + num < sectionsCount) ? index + num : null;

      if(nextIndex !== null){
          flag = !flag;   //动画未完成期间，事件不再触发
          article.style[dir] =window.parseFloat(window.getComputedStyle(article).getPropertyValue(dir)) - num * windowHeight + 'px';

          changePageIndex(nextIndex)
      }
    }
  }

  function changePageIndex(nextIndex){ //为了点击索引时有连续的效果
    var now = index,
        count = Math.abs(nextIndex - index);

    var indexChange = window.setInterval(function(){
      if(now >  nextIndex){
        pageIndexs[now].classList.remove('active');
        pageIndexs[--now].classList.add('active');
      }else if (now < nextIndex) {
        pageIndexs[now].classList.remove('active');
        pageIndexs[++now].classList.add('active');
      }

      if (now === nextIndex) {
        index = nextIndex;
        flag = !flag;
        window.clearInterval(indexChange)
      }
    }, parse/count)
  }

  function addEvent(obj,eventype,callback){
    if(obj.addEventListener){
      obj.addEventListener(eventype,callback,false);
    }else {
      obj.attachEvent('on' + eventype,callback);
    }
  }
};
