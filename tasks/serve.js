var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

gulp.task('serve', function() {
  var config = {
    debug: false,
    cache: true,
    entry: {
      'commons': ['./src/commons', 'webpack/hot/dev-server', 'webpack-hot-middleware/client'],
      'app': './src/app'
    },
    output: {
      path: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/static/'
    },
    stats: {
      colors: true,
      modules: false,
      source: false,
      chunks: false,
      chunkModules: false
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
      new ExtractTextPlugin("commons.css")
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss']
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\main.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.scss$/,
        loader: "style!css",
        include: path.join(__dirname, '../src/components')
      },
      {
        test: /\.jsx$/,
        loader: 'eslint-loader',
        include: path.join(__dirname, '../src')
      }
      ]
    }
  };
  var bundler = webpack(config);
  // bundler.run(function(err, stats) {
    // if(err) console.log(err);
    // console.log('done');
  // });
  browserSync({
    files: [{ match: ["index.html"]}],
    server: {
      baseDir: './',
      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: config.output.publicPath,

          // pretty colored output
          // stats: ,
          stats: config.stats,

          // hot: true,
          historyApiFallback: true

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
      ]
    }
  });
});
