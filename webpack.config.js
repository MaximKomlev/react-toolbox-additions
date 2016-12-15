const pkg = require('./package');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './example'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  resolve: {
    extensions: ['', '.scss', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style']
  },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: [/(node_modules)/],
        query: {                                                                                                                                                                           
          presets: ['es2015', 'stage-0', 'react']                                                                                                                                          
        }                                                                                                                                                                                  
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      }
    ]
  },
  postcss () {
    return [
      require('postcss-import')({
        root: __dirname
      }),
      require('postcss-mixins')(),
      require('postcss-each')(),
      require('postcss-cssnext')(),
      require('postcss-reporter')({ clearMessages: true })
    ];
  },
  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'example/index.html')
    })
  ]
};
