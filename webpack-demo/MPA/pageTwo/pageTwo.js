require('./pageTwo.scss')

var common = require('@/js/common.js')

$(function(){
  common.initHammer();
  $('.demo2-button-public').hammer().on('click',function(){
    common.logStr('demo2中调用公共方法');
  })

  $('.demo2-button-self').hammer().on('click',function(){
    logStr('demo2中调用自己方法');
  })
});


function logStr(Str) {
  console.log(Str)
}
