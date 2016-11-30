var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_modules_dir = __dirname + '/node_modules';
var isProduction =  process.env.DEV_ENV == 'production';
var publicPath = '/chaoshi/pages/baoxian/changshengrenshou/asset/';

config = {
	cache: true,
	entry: {
		app: path.resolve(__dirname, 'src/index.js'),
		shared: [
			'react',
			'react-router',
			'react-redux',
			'redux',
			'lodash/core',
			'actions',
			'reqwest',
			'components/modal',
			'components/handle'
		]
	},
	output: {
		path: path.join(__dirname, '/dist'+publicPath),
		filename: 'js/app.js',
		chunkFilename: 'js/chunk.[id].[hash:4].js',
		//cdn host
		publicPath: publicPath
	},
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules',
      'src/assets'
		],
		extensions: ['', '.json', '.js', '.png']
	},
	module: {
		loaders: [{
			test: /\.less$/,
			loader: ExtractTextPlugin.extract(
				'css?-minimize!' + 'autoprefixer-loader!' + 'less'
			)
		}, {
			test: /\.(js|jsx)?$/,
			exclude: /node_modules/,
			loaders: ['babel?optional=runtime&stage=0']
		}, {
			test: /\.json?$/,
			loader: 'json'
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css!postcss')
		}, {
			test: /\.(jp?g|gif|png|woff|ico)$/,
			loaders: ['url-loader?limit=15000&name=[name].[hash:4].[ext]', 'img?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}']
		},
			{ test: /\.svg(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=[name].[ext]' },
			{ test: /\.woff(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=[name].[ext]' },
			{ test: /\.woff2(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=[name].[ext]' },
			{ test: /\.[ot]tf(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=[name].[ext]' },
			{ test: /\.eot(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]' }
		]
	},
	imagemin: {
		gifsicle: {
			interlaced: false
		},
		jpegtran: {
			progressive: true,
			arithmetic: false
		},
		optipng: {
			optimizationLevel: 5
		},
		pngquant: {
			floyd: 0.5,
			speed: 2
		},
		svgo: {
			plugins: [{
				removeTitle: true
			}, {
				convertPathData: false
			}]
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.tpl.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new StatsPlugin('webpack.stats.json', {
			source: false,
			modules: true
		}),
		new ExtractTextPlugin('css/app.css', {
        allChunks: true
    }),
		new webpack.optimize.CommonsChunkPlugin('shared', 'js/shared.js'),
		new webpack.optimize.DedupePlugin(),
		//new webpack.optimize.UglifyJsPlugin({
		//	sourceMap: false,
		//	cache: false,
		//	compressor: {
		//		warnings: false,
		//		screw_ie8: false
		//	},
		//	output: {
		//		comments: false
		//	}
		//}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			moveToParents: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.DEV_ENV': JSON.stringify(process.env.DEV_ENV)
		})
	],
	postcss: [
		require('autoprefixer')
	]
};
if(isProduction){
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		sourceMap: false,
		cache: false,
		compressor: {
			warnings: false,
			screw_ie8: false
		},
		output: {
			comments: false
		}
	}))
}
module.exports = config;
