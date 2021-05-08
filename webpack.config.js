const path = require('path');


module.exports = {
  entry: './src/app.js',
  output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
  },
  module: {
    rules: [{
      //teaching webpack how to load babel
      loader: 'babel-loader',
      test: /\.js$/, //only when test meets this criteria and the file is not in the node modules folder go ahead and run it through babel
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,  //question mark made 's' optional
      use: [  //use allows us to provide an array of loaders
        'style-loader',
        'css-loader',
        'sass-loader'
      ]   
    }]
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
  
};