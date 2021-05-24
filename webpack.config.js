const path = require('path')

module.exports = () => {
  return {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
  }
}