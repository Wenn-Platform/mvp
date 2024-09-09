process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')
const config = environment.toWebpackConfig()
config.optimization.minimizer[0].options.terserOptions.compress.keep_fnames = true
config.optimization.minimizer[0].options.terserOptions.mangle.keep_fnames = true

module.exports = config
