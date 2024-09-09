const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
const { spawnSync } = require('child_process')

           // local dev
revision = spawnSync('git', ['rev-parse','HEAD']).stdout ||
           // elasticbeanstalk
           spawnSync('cat', ['.git-rev-deploy']).stdout
process.env.REV = revision.toString()

environment.plugins.prepend('Environment', new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))))

module.exports = environment
