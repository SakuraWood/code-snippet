window.onload = function(){
  var index = 0,
      windowHeight = window.innerHeight,
      sections = document.querySelector('.container').querySelectorAll('section'),
      pageIndexs = document.querySelector('.pageIndex').querySelectorAll('li'),
      sectionsCount = sections.length,
      flag = true,
      parse = 200;

  //监听事件
    //滚轮事件
	if(document.addEventListener){  //只有firefox使用 DOMMouseScroll
		document.addEventListener('DOMMouseScroll',scrollPage);
	}
	document.onmousewheel = scrollPage;  //其他浏览器  万恶的兼容性

  /*  //按键事件
  document.onkeydown = function(e){ //左上右下 37 38 39 40

    e = e || window.event;
    if(e.keyCode === 37 || e.keyCode === 38){
      changeSection('top',windowHeight)
    }else if(e.keyCode === 39 || e.keyCode === 40){
      changeSection('top',-windowHeight)
    }
  }
  */
  addEvent(document,'keydown',function(e){ //另一种绑定方式

    e = e || window.event;
    if(e.keyCode === 37 || e.keyCode === 38){
      changeSection('top',windowHeight);
    }else if(e.keyCode === 39 || e.keyCode === 40){
      changeSection('top',-windowHeight);
    }
  })

    //点击事件  使用事件委托，减少绑定事件的数量

  addEvent(document.querySelector('.pageIndex'),'click',function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    var targetIndex = [].slice.call(pageIndexs).indexOf(target);
    console.log('targetIndex : ' + targetIndex);
    if(targetIndex > 0 || targetIndex !== index){

      var targetDistance = targetIndex > index ? -windowHeight : windowHeight;
      if(Math.abs(targetIndex - index) > 1){

        changeSection('top',targetDistance);

        window.setTimeout(function(){   //临时方案,修改布局方式后应该不用这么麻烦
          var indexScroll = window.setInterval(function(){

            if(Math.abs(targetIndex - index) === 1){
              window.clearInterval(indexScroll);
            }

            changeSection('top',targetDistance);
          }, parse)
        },parse)
      }else {
        changeSection('top',targetDistance);
      }
    }
  })

  function scrollPage(e){  //滚动处理函数
  	e = e || window.event;
    var scrollDistance = e.detail || e.wheelDelta;

    if(scrollDistance > 0){//wheel up
      changeSection('top',windowHeight);
    }else {//wheel down
      changeSection('top',-windowHeight);
    }
  }

  function changeSection(direction,distance){ //切换页面和索引原点
    if(flag){

      nextIndex = distance < 0 && (index + 1 < sectionsCount) ? index + 1 : distance > 0 && (index-1 >= 0) ? index -1 : null;

      if(nextIndex !== null){
          flag = !flag;   //动画未完成期间，事件不再触发
          sections[index].style[direction] = distance + 'px';
          sections[nextIndex].style[direction] = 0;

          window.setTimeout(function(){
            pageIndexs[index].classList.remove('active');
            pageIndexs[nextIndex].classList.add('active');
            index = nextIndex;
            console.log('index :' + index );
            flag = !flag;
          },parse)
      }
    }
  }

  function addEvent(obj,eventype,callback){
    if(obj.addEventListener){
      obj.addEventListener(eventype,callback,false);
    }else {
      obj.attachEvent('on' + eventype,callback);
    }
  }
};
