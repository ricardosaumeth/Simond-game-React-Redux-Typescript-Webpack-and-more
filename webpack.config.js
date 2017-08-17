const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx',
    output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats: 'errors-only',
    open:true
  },
  // Enable sourcemaps for debugging webpack's output.
  //devtool: 'inline-source-map',

  watch: true,

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module:{
    rules:[
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
          test: /\.tsx?$/,
          use: ["awesome-typescript-loader"],
          exclude: /(node_modules)/,
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader", enforce: 'pre' },
      {
        test:/\.scss$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist'
        })
      },
      {
        test:/\.css$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist'
        })
      }
    ]
  },
    plugins: [
            new HtmlWebpackPlugin({
              title: 'Simon Game FCC',
              minify:{
                collapseWhitespace: true,
              },
              hash: false,
              template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
            }),
            new ExtractTextPlugin({
                filename: "app.css",
                disable: false,
                allChunks: true
            })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};