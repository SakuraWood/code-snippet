$(function(){

  //根据cookies进行判断，若存在则登录
  if($.cookie('username')){
    $("#nav_login,#nav_reg").hide();
    $("#nav_username,#nav_logout").show();
    $("#nav_username").html($.cookie("username"));
  }else {
    $("#nav_login,#nav_reg").show();
    $("#nav_username,#nav_logout").hide();
  }

  // 初始化页面的dialog
  $(".dialog_area")
  .dialog({
    autoOpen : false,
    resizable : false,
    modal : true,
    show : true,
    width : 400,
    height : 420
  });

  $(".login_dialog_area")
  .dialog({
    autoOpen : false,
    resizable : false,
    modal : true,
    show : true,
    width : 400,
    height : 280
  });

  $(".question_dialog_area")
  .dialog({
    autoOpen : false,
    resizable : false,
    modal : true,
    show : true,
    width : 580,
    height : 420,
  });

  $("#loading_area").dialog({

    autoOpen : false,
    modal : true,
    closeOnEscape : false,
    resizable : false,
    draggable : false,
    width : 180,
    height : 60,
  }).prev('.ui-widget-header').hide();

  $("#error").dialog({

    autoOpen : false,
    modal : true,
    closeOnEscape : false,
    resizable : false,
    draggable : false,
    width : 220,
    height : 60,
  }).prev('.ui-widget-header').hide();

  // 绑定按钮打开页面dialog
  $("#nav_reg").click(function(event) {
    /* Act on the event */
    $(".dialog_area").dialog('open');
  });

  $("#nav_login").click(function(event) {
    /* Act on the event */
    $(".login_dialog_area").dialog('open');
  });

  //判断登录状态，已登录可提问，未登录打开登录框
  $(".add_question_btn").click(function(event) {
    if($.cookie("username")){
        $(".question_dialog_area").dialog('open');
    }else{
        $("#error").dialog('open').css("background","url(img/error.png) no-repeat 20px center");
      setTimeout(function(){
        $("#error").dialog('close');
        $(".login_dialog_area").dialog('open');
      },1000);
    }
  });

  // 使用form.js插件处理提交数据
  $("#question_form").ajaxForm({

    url : 'add_content.php',
    type : 'POST',
    data : {
      user : $.cookie("username"),
      content : function(){
        console.log('提交数据 ：' + $('.uEditorIframe').contents().find('#iframeBody').html());
        return $('.uEditorIframe').contents().find('#iframeBody').html();
      },
    },
    success : function(responseText,statusText){
      console.log("请求成功 : " + responseText + " " + statusText);

      $("#loading_area").html("提交成功!").css("background","url(img/success.gif) no-repeat 20px center");
      $("#loading_area").dialog('open');
      //.5秒后关掉loading弹框及注册弹框，重置表单，再将loading中的文案背景复原
      setTimeout(function(){

        $("#loading_area").dialog('close');
        $(".question_dialog_area").dialog("close");
        $(".question_dialog_area").resetForm();
        $("#loading_area").html("数据提交中...").css("background","url(img/loading.gif) no-repeat 20px center");

      },1000);
    },

    error : function(event,errorText,errorType){
      console.log("请求失败 ：" + errorText + " " + errorType);

    },
  });


  //加载提问数据
  $.ajax({
    url: 'show_content.php',
    type: 'POST',

    success : function(data,textStatus,jqXHR){
      //返回的data为string类型 ，先转化为json
      var dataJson = $.parseJSON(data);
      var editorcontent = [];
      var editorsummary = [];
      var html = '';

      //展示问题内容
      for (var i = 0; i < dataJson.length; i ++) {
        html += '<h4>' + dataJson[i].user + ' 发表于 ' + dataJson[i].date + '</h4><h3>' + dataJson[i].title + '</h3><div class="editor">' + dataJson[i].content + '</div><div class="bottom"><span class="comment" data-id = "' + dataJson[i].id + '"  data-user = "' + dataJson[i].user + '">' + dataJson[i].count+ '条评论</span> <span class="up">收起</span></div><hr noshade="noshade" size="1" /><div class="comment_list"></div>';
      }
      $('.content').append(html);

      //处理数据，缩略展示200字符
      $.each($(".content .editor"),function(index, el) {
        //e为js对象，所以使用$(el)
        editorcontent[index] = $(el).html();
        editorsummary[index] = editorcontent[index].substr(0,200);

        if(editorsummary[index].substring(199,200) == "<"){
          replacePos(editorsummary[index],200,'');
        }
        if(editorsummary[index].substring(198,200) == "</"){
          replacePos(editorsummary[index],200,'');
          replacePos(editorsummary[index],199,'');
        }

        if(editorsummary[index].length >=200){
          editorsummary[index] += '...' + '<span class="down">显示全部</span>';
          $(el).next('div').find('.up').hide();
        }
        $(el).html(editorsummary[index]);
      });

      //动态绑定“显示全部”的点击事件
      $.each($(".content .editor"),function(index, el) {

        $(this).on('click','.down',function(event){
          $(el).html(editorcontent[index]);
          $(this).hide();
          $('.bottom .up').eq(index).show();
        });
      });

      //动态绑定“收起”的点击事件
      $.each($(".content .bottom"),function(index, el) {
        var this_bottom = $(this);
        this_bottom.on('click','.up',function(event){
          $(el).prev().html(editorsummary[index]);
          $(this).hide();
          $('.content .editor .down').eq(index).show();
        });
      });

      //动态绑定‘评论’的点击事件
      $.each($(".content .bottom"),function(index, el) {

        $(this).on('click','.comment',function(e){

          var comment_this = this;
          //登录后才可以评论
          if($.cookie("username")){
            //先判断是否存在提交评论的表单，若存在，则不再新增（只增加一次表单，之后就是显示和隐藏之间进行切换）
            if (!$('.comment_list').eq(index).has('form').length) {

              //加载评论数据
              $.ajax({
                url: 'show_comment.php',
                type: 'POST',
                data : {
                  titleid : $(comment_this).attr('data-id'),
                },

                success : function(commentdata,textStatus,jqXHR){
                  //返回的data1为string类型 ，先转化为json
                  var commentJson = $.parseJSON(commentdata);
                  $.each(commentJson, function (index1, value) {
                    $('.comment_list').eq(index).append('<dl class="comment_content"><dt>' + value.user + '</dt><dd>' + value.comment + '</dd><dd>' + value.date + '</dd></dl>');
                  });
                  //新增提交评论的表单HTML
                  $('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea type="text" name="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="' + $(comment_this).attr('data-id') + '" /><input type="hidden" name="user" value="' + $(comment_this).attr('data-user') + '" />' + '<input type="button" class="btn btn-default" value="发表" /></dd></dl></form>');

                },

                error : function(jaXhr,textStatus,errorThrown){

                },
              });
              //提交评论的按钮 事件绑定
              $('.content .comment_list').eq(index).find('input[type = button]').click(function(event) {

                var _this = $(this);
                //form.js插件处理提交数据
                $('.content .comment_list').eq(index).find('form').ajaxSubmit({
                  url : 'add_comment.php',
                  type : 'POST',
                  success : function(responseText,statusText){
                    console.log("请求成功 : " + responseText + " " + statusText);

                    //修改loading中的文案及背景为新增成功状态
                    $("#loading_area").html("评论新增成功!").css("background","url(img/success.gif) no-repeat 20px center");

                    //.5秒后关掉loading弹框，重置评论表单，再将loading中的文案背景复原
                    setTimeout(function(){
                      $("#loading_area").dialog('close');
                      _this.attr('disable', '');
                      $('.content .comment_list').eq(index).find('form').resetForm();
                      $("#loading_area").html("数据提交中...").css("background","url(img/loading.gif) no-repeat 20px center");
                    },1000);
                  },

                  error : function(event,errorText,errorType){
                    console.log("请求失败 ：" + errorText + " " + errorType);
                    $("#loading_area").html("请求出错，请重试！").css({
                      'color' : 'red'
                    });

                    setTimeout(function(){
                    _this.attr('disable', '');
                    $("#loading_area").dialog('close');
                    $("#loading_area").html("数据提交中...").css("color","#666");
                  },1000);
                  },

                  beforeSubmit : function(formData,jqForm,options){
                    _this.attr('disable', 'disable');
                    $("#loading_area").dialog('open');
                  },
                });
              });
            }

            if ($('.comment_list').eq(index).is(':hidden')) {
              $('.comment_list').eq(index).show();
            } else {
              $('.comment_list').eq(index).hide();
            }
          }else{
              $("#error").dialog('open').css("background","url(img/error.png) no-repeat 20px center");
            setTimeout(function(){
              $("#error").dialog('close');
              $(".login_dialog_area").dialog('open');
            },1000);
          }
        });
      });




    },
    error : function(){

    }
  });


  //logout
  $("#nav_logout").click(function(){
    $.removeCookie('username');

    $("#nav_login,#nav_reg").show();
    $("#nav_username,#nav_logout").hide();

  });


  //设置邮箱的autocomplete
  $(".dialog_area input[type='email']").autocomplete({

    source : function(request,response){

      var inputcontent = request.term;   //获取输入的字符
      var temphost = ['qq.com','163.com','meizu.com','gmail.com','sina.com.cn'];  //定义支持选择的域名
      var x = inputcontent.indexOf('@'); //获取输入字符中@的位置
      var name = ( x == -1 ? inputcontent : inputcontent.slice(0, x));   //获取输入字符中@之前的name
      var host = ( x == -1 ? '' : inputcontent.slice(x+1)); //获取输入字符中@之后的域名
      result = [];  //返回值默认为空数组

      result.push(inputcontent);   //提示的第一个总是输入值

      //如果@后的域名为空，则补全所有的预置域名
      //如果@后的域名不为空，则进行过滤，找到符合条件的预置域名进行补全 若没有符合条件的预置域名则不进行处理
      if(host){
        var temp = $.grep(temphost,function(element,index){
          return element.indexOf(host) > -1;
        });
        if(temp){
          temp = $.map(temp,function(element,index){
            return name + "@" + element;
          });
          result = result.concat(temp);
        }
      }else{
        var tempresponse = $.map(temphost,function(element, index ) {
           return name + "@" + element;
         });
         result = result.concat(tempresponse);
      }
    response(result);
    },
    autoFocus : true,
    daley : 0,
    minLength : 1
  });

  //初始化日历组件
  $("#reg_birthday").datepicker({
    closeText: '关闭',
		prevText: '&#x3C;上月',
		nextText: '下月&#x3E;',
		currentText: '今天',
		monthNames: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		monthNamesShort: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		weekHeader: '周',
		dateFormat: 'yy/mm/dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '年',
    showOtherMonths : true,
    changeMonth : true,
    changeYear : true,
    showButtonPanel : true,

    // //日历组件关闭时，使输入框失焦
    // onClose : function(){
    //   if($(":focus") == $(this)){
    //     this.blur();
    //   }
    // }
  });

  //初始化validation插件，设定校验规则

  // // 可初始化validate的全局设置
  // jQuery.validator.setDefaults({
  //   debug : true,
  // });
    //注册页面
  $("#reg_form").validate({
    rules : {
      user : {
        required : true,
        minlength : 2,
        remote : {
          url : 'is_user.php',
          type : 'POST',
        },
      },
      password : {
        required : true,
        minlength : 6,
      },
      email : {
        required : true,
        email : true,
      }
    },
    messages : {
        user : {
          required : "请输入用户名",
          minlength : jQuery.validator.format("用户名不得小于{0}位"),
          remote : "用户名已存在",
        },
       password : {
         required : "请设置密码",
         minlength : jQuery.validator.format("密码不得小于{0}位"),
       },
       email : {
         required : "请设置邮箱",
         email : "请检查您的邮箱格式",
       }
    },

    showErrors : function(errorMap,errorList){
        var errors = this.numberOfInvalids();
        // $(".dialog_area").height(errors*24 + $(".dialog_area").height());
        $(".dialog_area").dialog('option','height',420+errors*24);
        this.defaultShowErrors();
    },

    unhighlight : function(element,errorClass){

      $(element).parent().next().removeClass('requredstar glyphicon glyphicon-exclamation-sign').html("").addClass('glyphicon glyphicon-ok-circle').css({
        'color':'green',
        'padding-left' : '0'
      });
    },

    highlight : function(element,errorClass){

      $(element).parent().next().removeClass('requredstar glyphicon glyphicon-ok-circle').html("").addClass('glyphicon glyphicon-exclamation-sign').css({
        'color':'red',
        'padding-left' : '0'
      });
    },

    submitHandler : function(form){
      //form.js插件设置 进行数据交互
      console.log("提交表单:" +form);
      $(form).ajaxSubmit({
        url : 'add.php',
        type : 'POST',
        success : function(responseText,statusText){
          console.log("请求成功 : " + responseText + " " + statusText);

          //修改loading中的文案及背景为注册成功状态
          $("#loading_area").html("注册成功!").css("background","url(img/success.gif) no-repeat 20px center");

          //.5秒后关掉loading弹框及注册弹框，重置表单，再将loading中的文案背景复原
          setTimeout(function(){
            $.cookie('username',$("#reg_account").val());
            $("#loading_area").dialog('close');
            $(".dialog_area").dialog("close");
            $(".dialog_area").resetForm();
            $("#loading_area").html("数据提交中...").css("background","url(img/loading.gif) no-repeat 20px center");
            $(".dialog_area label.glyphicon-ok-circle").removeClass('glyphicon glyphicon-ok-circle').html("*").addClass('requredstar').css({
              'color':'maroon'
            });
            //登录
            $("#nav_login,#nav_reg").hide();
            $("#nav_username,#nav_logout").show();
            $("#nav_username").html($.cookie("username"));
          },1000);
        },

        error : function(event,errorText,errorType){
          console.log("请求失败 ：" + errorText + " " + errorType);
          $("#loading_area").html("请求出错，请重试！").css({
            'color' : 'red'
          });

          setTimeout(function(){
          $("#loading_area").dialog('close');
          $("#loading_area").html("数据提交中...").css("color","#666");
        },1000);
        },

        beforeSubmit : function(formData,jqForm,options){
          $("#loading_area").dialog('open');
        },

      });
    }
  });

   //登录页面
  $("#login_form").validate({
    rules : {
      login_user : {
        required : true,
        minlength : 2,
      },
      login_password : {
        required : true,
        minlength : 6,
        remote : {
          url : 'login.php',
          type : 'POST',
          data : {
            login_user : function(){
              return $("#login_account").val();
            }
          }
        }
      },
    },
    messages : {
        login_user : {
          required : "请输入用户名",
          minlength : jQuery.validator.format("用户名不得小于{0}位"),
        },
       login_password : {
         required : "请输入密码",
         minlength : jQuery.validator.format("密码不得小于{0}位"),
         remote : "帐号或者密码错误"
       },
    },

    showErrors : function(errorMap,errorList){
        var errors = this.numberOfInvalids();
        $(".login_dialog_area").dialog('option','height',280+errors*24);
        this.defaultShowErrors();
    },

    unhighlight : function(element,errorClass){

      $(element).parent().next().removeClass('requredstar glyphicon glyphicon-exclamation-sign').html("").addClass('glyphicon glyphicon-ok-circle').css({
        'color':'green',
        'padding-left' : '0'
      });
    },

    highlight : function(element,errorClass){

      $(element).parent().next().removeClass('requredstar glyphicon glyphicon-ok-circle').html("").addClass('glyphicon glyphicon-exclamation-sign').css({
        'color':'red',
        'padding-left' : '0'
      });
    },

    submitHandler : function(form){
      //form.js插件设置 进行数据交互
      console.log("提交表单:" +form);
      $(form).ajaxSubmit({
        url : 'login.php',
        type : 'POST',
        success : function(responseText,statusText){
          console.log("请求成功 : " + responseText + " " + statusText);

          //修改loading中的文案及背景为登录成功状态
          $("#loading_area").html("登录成功!").css("background","url(img/success.gif) no-repeat 20px center");

          //.5秒后关掉loading弹框及注册弹框，重置表单，再将loading中的文案背景复原
          setTimeout(function(){
            if($("#login_checkbox").is(':checked')){
              $.cookie('username',$("#login_account").val(),{
                expires : 7,
              });
            }
            $("#loading_area").dialog('close');
            $(".login_dialog_area").dialog("close");
            $(".login_dialog_area").resetForm();
            $("#loading_area").html("数据提交中...").css("background","url(img/loading.gif) no-repeat 20px center");
            $(".login_dialog_area label.glyphicon-ok-circle").removeClass('glyphicon glyphicon-ok-circle').html("").addClass('requredstar').css({
              'color':'maroon'
            });
            //登录
            $("#nav_login,#nav_reg").hide();
            $("#nav_username,#nav_logout").show();
            $("#nav_username").html('<span class="glyphicon glyphicon-user"></span>'+ ' '+$.cookie("username"));
          },1000);
        },

        error : function(event,errorText,errorType){
          console.log("请求失败 ：" + errorText + " " + errorType);
          $("#loading_area").html("请求出错，请重试！").css({
            'color' : 'red'
          });

          setTimeout(function(){
          $("#loading_area").dialog('close');
          $("#loading_area").html("数据提交中...").css("color","#666");
        },1000);
        },

        beforeSubmit : function(formData,jqForm,options){
          $("#loading_area").dialog('open');
        },

      });
    }
  });

  //阻止注册页面dialog弹出时input第一次自动获取焦点
  // $(".dialog_area input").eq(0).one('focus', function(event) {
    /* Act on the event */
  //   $(this).blur();
  // });

  /*
  //初始化tooltip
  $(".dialog_area").tooltip({
    items : 'input',
    hide : false,
    show : false,
    position : {
      my : "left center",
      at : "right+5 center"
    }
  });
  */
  //tabs组件初始化
  $("#content_tabs").tabs({
    active : 0,
  });
  //accordion组件初始化
  $('#content_accordion').accordion({
    collapsible : true,
    active : false,
  });
  //调用uEditor插件
  $('.question_content').uEditor();


  var replacePos = function(str,pos,replaceText){
    return str.substr(0,pos)+replaceText+str.substring(pos+1,str.length);
  };
});
