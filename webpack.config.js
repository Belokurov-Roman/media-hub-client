module.exports = {
  renderer: {
    entry: './src/renderer/javascripts/index.js',
    module: {
      rules: [
        {
          test: /\.(tsx?|jsx?)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
            plugins: ['@babel/transform-runtime'],
          },
        },
        {
          test: /\.svg$/,
          loader: 'react-svg-loader',

        },
      ],
    },
  },
  preload: {
    entry: './src/preload/index.js',
  },
  main: {
    entry: './src/main/index.js',
  },
};
