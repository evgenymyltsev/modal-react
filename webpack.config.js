const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const SETTINGS = require('./settings');
const production = process.env.NODE_ENV === 'production';

const stylesLoaders = [
	{
		loader: "style-loader"
	}, {
		loader: "css-loader"
	}, {
		loader: "less-loader"
	}
];

const loaders = [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: path.join(__dirname, 'src'),
    exclude: /node_modules/,
  },

  {
    test: /\.(css|less)$/,
    loader: production
      ? ExtractTextPlugin.extract({ fallback: 'style-loader', use: stylesLoaders })
      : ['style-loader', ...stylesLoaders],
  },

  {
    test: /\.(svg|png|jpg|gif|woff|woff2|otf|ttf|eot)$/,
    loader: 'file-loader',
  },
];

const pluginsBase = [
  new HtmlWebpackPlugin({ template: 'template.ejs' }),

  new FaviconsWebpackPlugin({
    logo: './favicon.png',
    background: SETTINGS.THEME_COLOR,
    icons: SETTINGS.FAVICONS,
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || ''),
    },
  }),
];

const developmentPlugins = [
  ...pluginsBase,
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new OpenBrowserPlugin({ url: `http://localhost:${SETTINGS.PORT}` }),
];

const productionPlugins = [
  ...pluginsBase,
  new ExtractTextPlugin('[name].css'),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      sequences: true,
      booleans: true,
      loops: true,
      unused: false,
      warnings: false,
      drop_console: true,
      unsafe: true,
    },
  }),
];

module.exports = {
  devtool: production ? 'cheap-module-source-map' : 'eval',

  entry: production
    ? './src/index'
    : [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${SETTINGS.PORT}`,
      'webpack/hot/only-dev-server',
      './src/index',
    ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json'],
  },

  module: { loaders },
  plugins: production ? productionPlugins : developmentPlugins,
};
