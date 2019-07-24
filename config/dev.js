const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"https://carrotapp.applinzi.com"'
const HOST_DEV = '"http://localhost:3000"'

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST,
    HOST_DEV: isH5 ? '"/api-dev"' : HOST_DEV,
  },
  weapp: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        },
        '/api-dev/': {
          target: JSON.parse(HOST_DEV),
          pathRewrite: {
            '^/api-dev/': '/'
          },
          changeOrigin: true
        }
      }
    }
  }
}
