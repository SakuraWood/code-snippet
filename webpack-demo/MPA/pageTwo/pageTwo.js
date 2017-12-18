require('./pageTwo.scss')
require('@/js/jquery.validate.js')

var common = require('@/js/common.js')

$(function() {
  common.initHammer();
  $('.demo2-button-public').hammer().on('click', function() {
    common.logStr('demo2中调用公共方法');
  })

  $('.demo2-button-self').hammer().on('click', function() {
    logStr('demo2中调用自己方法');
  })

  $('.demo2-button-validate').hammer().on('click', function() {
    console.log($(this).validate);
  })
});


function logStr(Str) {
  console.log(Str)
}
