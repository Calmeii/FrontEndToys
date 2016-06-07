var path = require('path');
var webpack = require('webpack');

var nodeDev = process.env.NODE_ENV;
var production = nodeDev === 'production';

var config = {
  entry: ['./src/index.js'],
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'word_down.js'
  },
  
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      }
    ]
  },
  
  resolve: {
    extensions: ['', '.js', '.json']
  },
  
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
  
};

if (production) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
} else {
  config.entry.unshift(
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server'
  );
}

module.exports = config;