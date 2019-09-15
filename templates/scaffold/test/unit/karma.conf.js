// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const UI_ENV_VARS = require('../../environment.build')
const { resolve } = require('path')

module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: ['ChromeHeadless'],
    colors: true,
    concurrency: Infinity,
    coverageIstanbulReporter: {
      combineBrowserReports: true,
      dir : 'test/unit/coverage/',
      fixWebpackSourcePaths: true,
      reports: ['html', 'lcovonly', 'text-summary'],
      skipFilesWithNoCoverage: false
    },
    files: [
      { included: true, pattern: 'elements/index.spec.js', type: 'module' },
      { included: true, pattern: 'components/index.spec.js', type: 'module' },
      { included: true, pattern: 'services/index.spec.js', type: 'module' },
    ],
    frameworks: ['chai', 'mocha', 'sinon'],
    logLevel: config.LOG_INFO,
    plugins: [
      require('karma-chai'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha'),
      require('karma-sinon'),
      require('karma-webpack'),
    ],
    port: 9876,
    preprocessors: {
      'components/index.spec.js': ['webpack'],
      'elements/index.spec.js': ['webpack'],
      'services/index.spec.js': ['webpack'],
    },
    reporters: ['progress', 'coverage-istanbul'],
    singleRun: true,
    webpack: {
      externals: {
        environment: JSON.stringify(UI_ENV_VARS)
      },
      mode: 'development',
      module: {
        rules: [
          {
            enforce: 'post',
            exclude: /(node_modules|index\.js|\.spec\.js)$/,
            include: resolve('src/'),
            test: /\.js$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            },
          },
          {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader',
              options: {
                attrs: false
              }
            }
          }
        ]
      },
      resolve: {
        alias: {
          components: resolve(__dirname, '..', '..', 'src/components'),
          elements: resolve(__dirname, '..', '..', 'src/elements'),
          features: resolve(__dirname, '..', '..', 'src/features'),
          services: resolve(__dirname, '..', '..', 'src/services'),
          templates: resolve(__dirname, '..', '..', 'src/templates')
        },
        extensions: ['.js']
      },
    },
    webpackMiddleware: {
      noInfo: true
    }
  })
}
