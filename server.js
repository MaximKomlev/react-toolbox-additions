var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

config.entry.push('webpack-dev-server/client?http://localhost:8000');

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path
}).listen(8000, '', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:8000/');
});