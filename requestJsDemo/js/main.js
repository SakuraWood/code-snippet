//主程序

//配置项
require.config({
  //如未显式设置baseUrl，则默认值是加载require.js的HTML所处的位置。如果用了data-main属性，则该路径就变成baseUrl。
  baseUrl : 'js',
  paths : {
    test : '../test/test'
  }
});

//导入Mymodule和test模块
//
require(['Mymodule','test'],function(Mymodule,test){

  alert(Mymodule.add(1,2));
  console.log(test.a);
});
