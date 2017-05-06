$(function(){
  var showareaDom = $('.main-area');
  var addbtnDom = $('#addbtn');
  var addcontent = $('#addcontent');
  var changeindex = $('#changeindex');
  var newcontent = $('#newcontent');
  var changebtnDom = $('#changebtn');
  var insertbtnDom = $('#insertbtn');
  var deleteindex = $('#deleteindex');
  var deletebtnDom = $('#deletebtn');
  var deleteAllDom = $('#deleteAllbtn');

  addbtnDom.click(function(){
    if(addcontent.val() === ''){
      alert('请输入任务内容！');
    }else {
      var newDom = $('<li>' + addcontent.val() + '</li>');
      //在showareaDom对象内部后面 增加 一个 li对象
      showareaDom.append(newDom);
      addcontent.val('');
    }
    changeTitle();
  });

  changebtnDom.click(function(){

    if(changeindex === ""||newcontent === ""){
      alert('请输入修改任务的序号和内容！');
    }else{
      $('ol.main-area li').eq(changeindex.val()-1).html(newcontent.val());
    }
  });

  insertbtnDom.click(function(){
    var insertindex1 = $('#insert1');
    var insertindex2 = $('#insert2');
    if(insertindex1.val()===''||insertindex2.val()===''){
      alert("请输入需交换的任务序号！");
    }else {
      var num1 = sortNum(insertindex1.val()-1,insertindex2.val()-1)[0];
      var num2 = sortNum(insertindex1.val()-1,insertindex2.val()-1)[1];

      var temp =$('ol.main-area li:eq('+ num1 +')');

      //将target对象 插入到目标元素前/后 before/after
      //也可以用来移动已存在的对象
      $('ol.main-area li:eq('+ num1 +')').after($('ol.main-area li:eq('+ num2 +')'));
      $('ol.main-area li:eq('+ num2 +')').after($('ol.main-area li:eq('+ num1 +')'));
    }
  });

  deletebtnDom.click(function(){
    var index = deleteindex.val();
    if(index === ''){
      alert("请输入需删除的任务序号！");
    }else{
      //eq过滤中使用变量 需要用"+"号
      //remove 移除元素
      $('.main-area li').remove('li:eq('+ (index-1) +')');
      deleteindex.val('');
    }
    changeTitle();
  });

  deleteAllDom.click(function(){
    $('ol.main-area').empty();
    changeTitle();
  });



  function changeTitle(){
    if($('ol.main-area li').length > 0){
      $('.show-area h3').html("未完成任务列表");
    }else(
      $('.show-area h3').html("任务列表为空！")
    );
  }

  function sortNum(num1,num2){

    var temp = [];
    temp.push(num1,num2);
    return temp.sort();

  }
});
