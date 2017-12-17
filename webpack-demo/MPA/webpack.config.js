var webpack = require('webpack');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//自动生成HTML的实例 --- 工厂函数
function webpackHtml(path,name){
  var temp =
            {
              filename : name + '.html',
              template : __dirname + '/'+ path +'/' + name + '.html',
              inject : true,
              hash : true,
              minify : {
                removeAttributeQuotes: true
              },
              cache : true,
              chunks :  ['lib','common',name],
              chunksSortMode : 'manual'
            }
      return temp
}

const config = {
  resolve : {
    alias : {  //定义常用目录
      '@': path.resolve(__dirname,'public'),
    }
  },
  //入口文件    本项目需配置多个入口
	entry: {
    lib : ['jquery','hammerjs'],
    common : '@/js/common.js',
		pageOne : './pageOne/pageOne.js',
    pageTwo : './pageTwo/pageTwo.js'
	},
  //打包完成后的出口文件 PS: __dirname为node中的全局变量，对应的是当前执行的路径
	output:{
		filename: 'js/[name].[hash].js',
		path: __dirname + '/dist',
		publicPath: '/dist/'                     //加载外部资源（如图片、文件等）  相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析
	},
	devtool: 'inline-source-map',    //为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。
  module: {
		rules: [
			{
				test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
			},
			{
				test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use : [
					{
						loader : 'url-loader',
						options : {
							limit : 8192,           //文件大小比设置值小时，会转化为base64格式
							name : 'img/[name].[ext]?[hash]'   //路径+名称
						}
					}
				]
			},
		]
	},
	plugins: [
    //自动加载模块
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      Hammer:'hammerjs'
    }),
    // 提取公共的JavaScript文件，尽量将不常修改的文件打包为一个，让浏览器多使用缓存
    // new webpack.optimize.CommonsChunkPlugin({
    //   name : 'vendor',
    //   filename : 'js/common.[hash].js',
    //   chunks: ['vendor']
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name : 'lib',
      filename : 'js/[name].[hash].js',
      chunks: ['lib']
    }),
    //提取css为单独文件
    new ExtractTextPlugin({
     filename: 'css/[name].[hash].css'
    }),
    //如果想生成多个HTML页面，就需要创建多个插件实例，用chunks引入不同的JS
		new HtmlWebpackPlugin(webpackHtml('pageOne', 'pageOne' , true)),
    new HtmlWebpackPlugin(webpackHtml('pageTwo', 'pageTwo' , true))
	]
};

module.exports = config;
