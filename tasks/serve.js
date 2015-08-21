var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

gulp.task('serve', function() {
  var config = {
    debug: true,
    cache: true,
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      './src/app'
    ],
    output: {
      path: "/",
      filename: 'bundle.js',
      publicPath: '/static/'
    },
    stats: {
      colors: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.scss$/,
        loader: "style!css"
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
  browserSync({
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
