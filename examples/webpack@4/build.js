const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsCDNPWebpackPlugin = require('../../index');

const stamp = (new Date()).valueOf();

const AssetsConfig = [
  {
    baseURL: '/cdn_url',
    htmls: {
      index: {
        js: ['axios', 'lodash'],
        css: ['reset', 'common'],
      }
    }
  },
  {
    baseURL: '/cdn_url',
    htmls: {
      index: {
        js: {
          slot: 'header',
          libs: ['axios', 'lodash']
        },
        css: {
          slot: 'footer',
          libs: ['reset', 'common']
        }
      }
    }
  },
  {
    baseURL: '/cdn_url',
    rename: (type, name) => `${name}${type === 'css' ? '.min' : ''}.${type}`,
    htmls: {
      index: {
        js: ['axios', 'lodash'],
        css: ['reset', 'common'],
      }
    }
  },
  {
    baseURL: '/cdn_url',
    fullURL: (baseURL, type, name) => {
      if (type === 'css') {
        return `${baseURL}/${name}.css?${stamp}`;
      } else {
        return `${baseURL}:8000/${name}.min.js?${stamp}`;
      }
    },
    htmls: {
      index: {
        js: ['axios', 'lodash'],
        css: ['reset', 'common'],
      }
    }
  }
];

const CONFIG = {
  // mode: 'production',
  entry: {
    main: './main.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve('./dist/index.html'),
      template: path.resolve('./index.html'),
      inject: true
    }),
    new AssetsCDNPWebpackPlugin(AssetsConfig[2])
  ]
}

webpack(CONFIG, (err) => {
  if (err) {
    console.log('build error');
    throw err;
  }
  console.info('build success!');
});
