var webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	path = require('path'),
	pkg = require('./package'),
	ip = require('ip'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ROOT_PATH = path.resolve(__dirname),
	APP_PATH = path.resolve(ROOT_PATH, 'src');

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		APP_PATH
	],
	output: {
		path: path.join(__dirname, '/build/'),
		filename: 'build/[name].[hash:4].js',
		chunkFilename: 'build/chunk.[id].[hash:4].js',
		publicPath: '/'
	},
	module: {
		loaders: [{
			test: /\.less$/,
			loader: 'style!css!postcss!less'
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loaders: ['react-hot', 'babel?optional=runtime&stage=0']
		}, {
			test: /\.(jpe?g|gif|png|ico|svg)$/,
			loader: 'url?limit=8192&name=build/[name].[hash:4].[ext]'
		}, {
			test: /\.json$/,
			loader: 'json'
		},
			{ test: /\.svg(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=build/[name].[ext]' },
			{ test: /\.woff(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=build/[name].[ext]' },
			{ test: /\.woff2(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=build/[name].[ext]' },
			{ test: /\.[ot]tf(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=build/[name].[ext]' },
			{ test: /\.eot(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=build/[name].[ext]' }
		]
	},
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules',
			'src/assets'
		],
		extensions: ['', '.js', '.png']
	},
	postcss: function() {
		return [
			require('autoprefixer'),
			require('precss')
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			inject: 'body',
			template: "src/index.tpl.html"
		}),
		new ExtractTextPlugin('build/app.[hash:4].css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			moveToParents: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			'process.env.ISMORK': JSON.stringify(process.env.ISMORK)
		})
	],
	devtool: 'source-map'
};
