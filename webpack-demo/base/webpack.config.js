var webpack = require('webpack');
//外部插件需要引入，webpack自带的不需要引入
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = {
  // 配置文档 https://doc.webpack-china.org/configuration/
  //入口文件    可配置多个入口  也可使用函数配置动态入口  详见文档
	entry: {
		main : './app/js/main.js'
		// index: './app/js/index.js'
    // index2: './app/js/index2.js'
	},
  //打包完成后的出口文件       __dirname为node中的全局变量，对应的是当前执行的路径
	output:{
		filename: '[name].bundle.js',
		path: __dirname + '/dist',          //output 目录对应一个绝对路径。
		publicPath: ''                     //加载外部资源（如图片、文件等）  相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析
	},
	devtool: 'inline-source-map',    //为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。
	devServer : {
    // contentBase : [path.join(__dirname,"dist")], //告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要     注意，推荐使用绝对路径
		compress: false,        //是否启用压缩
		host : 'localhost',
		port: 9000,         //要监听的端口号
    // publicPath : "/test/",     //确保 publicPath 总是以斜杠(/)开头和结尾
		open : true,      //自动打开浏览器
		openPage : 'autoHtml.html',    //打开浏览器时，自动打开的页面  如果有publicPath 则也需要加上对应的目录'test/autoHtml.html'
		hot : true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				include: __dirname + '/app',
				use:{
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.css$/,
        // use: [
        //   {
        //     loader : 'style-loader'
        //   },
        //   {
        //     loader : 'css-loader'
        //   }
        // ]
				use : ExtractTextWebpackPlugin.extract({  //ExtractTextWebpackPlugin 插件生成单独CSS文件时需要如此配置
					fallback : 'style-loader',          // loader（例如 'style-loader'）应用于当 CSS 没有被提取(也就是一个额外的 chunk，当 allChunks: false)
					use : 'css-loader',            // loader 被用于将资源转换成一个 CSS 导出模块 (必填)
					publicPath : '../'
				})
			},
			{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader' // 将 JS 字符串生成为 style 节点
				}, {
					loader: 'css-loader' // 将 CSS 转化成 CommonJS 模块
				}, {
					loader: 'sass-loader' // 将 Sass 编译成 CSS
				}]
			},
			{
        //url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。通过上面的介绍，我们可以看到，url-loader工作分两种情况：1.文件大小小于limit参数，url-loader将会把文件转为DataURL；2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。
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
			}
		]
	},
	plugins: [
    //如果想生成多个HTML页面，就需要创建多个插件实例，用chunks引入不同的JS
		new HtmlWebpackPlugin({
			title : 'htmlwebpackplugin title',  //设置生成的 html 文件的标题      如果你既指定了 template 选项，又指定了 title 选项，那么webpack 会选择你指定的模板文件的 title, 即使你的模板文件中未设置 title
			favicon : 'app/images/favicon-20170826095607223.ico',    //给生成的 html 文件生成一个 favicon。属性值为 favicon 文件所在的路径名
			filename : 'autoHtml.html',                   //生成 html 文件的文件名。默认为 index.html
			template : 'app/index.template.html',       //根据自己的指定的模板文件来生成特定的 html 文件
			inject : true,    //注入选项。有四个选项值 true/body(script标签位于html文件的 body 底部), head(script 标签位于 head 标签内), false(不引入js只生成纯HTML)
			hash : true,      //给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false
			minify : {    //html-webpack-plugin 内部集成了 html-minifier ,这个压缩选项同 html-minify 的压缩选项完全一样
				removeAttributeQuotes: true // 移除属性的引号
			},
			cache : true,        //默认值是 true。表示只有在内容变化时才生成一个新的文件
			showErrors : true,   //showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息。
			chunks :  ['main'],            //chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件 , 默认引入所有的JS
      // excludeChunks: ['index1.js']      //排除掉某些 js 文件
      //chunksSortMode            //这个选项决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}'。
      //xhtml                    //一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。
		}),
    //生成单独的 css文件
		new ExtractTextWebpackPlugin({
			filename : 'css/index.css'      //生成的CSS文件名  同样可以指定路径   如果是多个入口文件想生成不同的CSS的话  就必须使用 [name] [id] [contenthash] 等
		}),
		new webpack.HotModuleReplacementPlugin({

		}),   //  模块热替换允许在运行时更新各种模块，而无需进行完全刷新。
    // //使用自带的压缩工具  new webpack.options.UglifyJsPlugin
    // new UglifyJsWebpackPlugin({
    //   // test : ,
    //   // include : ,
    //   exclude : 'node_modules/',
    //   parallel : {
    //     cache : true,
    //     workers : true
    //   },
    //   sourceMap : true,
    //   uglifyOptions : {
    //     ie8: false,
    //     ecma: 8,
    //     warnings: false
    //   }
    // })
	]
};

module.exports = config;
