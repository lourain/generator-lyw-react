const FileManagerPlugin = require('filemanager-webpack-plugin')
const { name, version } = require('./package.json')
const path = require('path')
const CracoLessPlugin = require('craco-less')
const resolveApp = (relativePath) => path.resolve(__dirname, relativePath)
const appPath = resolveApp('.')
const appBuild = resolveApp('build')

const lessModuleRegex = /\.module\.less$/

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (env !== 'development') {
        webpackConfig.plugins = webpackConfig.plugins.concat(
          new FileManagerPlugin({
            events: {
              onEnd: {
                mkdir: [`zip/${name}/dist`],
                copy: [
                  {
                    source: `${appPath}/config/conf.${process.env.REACT_APP_TARGET_ENV}.js`,
                    destination: `${appBuild}/config.js`,
                  },
                  {
                    source: `${path.resolve('build')}`,
                    destination: `zip/${name}/dist`,
                  },
                ],
                archive: [
                  {
                    source: `zip`,
                    destination: path.relative(__dirname, `./${name}-${version}-SNAPSHOT.tar.gz`),
                    format: 'tar',
                    options: {
                      gzip: true,
                      gzipOptions: {
                        level: 1,
                      },
                      globOptions: {
                        nomount: true,
                      },
                    },
                  },
                ],
                delete: ['zip'],
              },
            },
            runTasksInSeries: true,
          })
        )
      }
      return webpackConfig
    },
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#85CE3F',
              '@border-radius-base': '5px',
            },
            javascriptEnabled: true,
          },
        },
      },
      // A callback function that receives two arguments: the webpack rule, and the context. You must return an updated rule object.
      modufyLessRule: (lessRule) => {
        lessRule.text = lessModuleRegex
        lessRule.exclude = /node_module|antd\.(less|css)/
        return lessRule
      },
      cssLoaderOptions: {
        modules: { localIdentName: '[local]_hash:base64:5' },
      },
    },
  ],
}
