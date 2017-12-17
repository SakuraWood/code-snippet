require('./pageOne.scss')
var common = require('@/js/common.js')

$(function(){
  common.initHammer();
  $('.demo1-button-public').hammer().on('click',function(){
    common.logStr('demo1中调用公共方法');
  })

  $('.demo1-button-self').hammer().on('click',function(){
    logStr('demo1中调用自己方法');
  })
});


function logStr(Str) {
  console.log(Str)
}
