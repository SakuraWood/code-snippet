//引入公共样式
require('../css/common.scss')

//公共函数，放在common对象属性
var common = {}

common.logStr = function(Str){
  console.log('common function say : ' +  Str)
}

common.initHammer = function(){

  (function($, Hammer) {
      function hammerify(el, options) {
          var $el = $(el);
          if(!$el.data("hammer")) {
              $el.data("hammer", new Hammer($el[0], options));
          }
      }

      $.fn.hammer = function(options) {
          return this.each(function() {
              hammerify(this, options);
          });
      };

      // extend the emit method to also trigger jQuery events
      Hammer.Manager.prototype.emit = (function(originalEmit) {
          return function(type, data) {
              originalEmit.call(this, type, data);
              $(this.element).trigger({
                  type: type,
                  gesture: data
              });
          };
      })(Hammer.Manager.prototype.emit);
  })(jQuery,Hammer)

}

module.exports = common
