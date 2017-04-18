//包装函数

module.exports = function(grunt){

  // 任务配置，所有插件的配置信息
  grunt.initConfig({
    //获取 package.json的信息

    pkg : grunt.file.readJSON('package.json')
  });

  // 告诉grunt 当我们在终端输入 grunt 时需要做些什么（要注意先后顺序）

  grunt.registerTask('default', []);

};
